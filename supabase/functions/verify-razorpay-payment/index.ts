import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
// In a real environment we would use a crypto library, but we can do HMAC SHA256 natively in Deno
import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      resume_id,
      amount
    } = await req.json()

    const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET')
    
    if (!RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay secret not configured')
    }

    // Verify signature
    const generated_signature = hmac(
      "sha256",
      RAZORPAY_KEY_SECRET,
      razorpay_order_id + "|" + razorpay_payment_id,
      "utf8",
      "hex"
    );

    if (generated_signature !== razorpay_signature) {
      throw new Error("Invalid payment signature")
    }

    // Payment is valid! Update Supabase database
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the user ID from the auth header token
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseClient.auth.getUser(token)

    if (!user) throw new Error("Unauthorized")

    // Insert payment record
    const { error: dbError } = await supabaseClient
      .from('payments')
      .insert({
        user_id: user.id,
        resume_id: resume_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        amount_inr: amount,
        status: 'successful'
      })

    if (dbError) throw dbError

    return new Response(
      JSON.stringify({ success: true, message: "Payment verified successfully" }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
