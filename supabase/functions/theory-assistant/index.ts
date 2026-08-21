import {createClient} from 'https://esm.sh/@supabase/supabase-js@2';
const allowedOrigins=new Set(['https://anchorpoint.com.bd','https://anchor-point-launch-25-preview.pages.dev']);
const corsFor=(origin:string)=>({
  'Access-Control-Allow-Origin':allowedOrigins.has(origin)||origin.startsWith('http://127.0.0.1:')?origin:'https://anchorpoint.com.bd',
  'Access-Control-Allow-Headers':'authorization, apikey, content-type',
  'Access-Control-Allow-Methods':'POST, OPTIONS',
  'Vary':'Origin'
});
const refuse=/\b(approve|certify|select|size|bypass|disable|override|site instruction|method statement|emergency|exact setting|protection setting|weapon|explosive)\b/i;
Deno.serve(async(req)=>{
  const origin=req.headers.get('origin')||'';
  const cors=corsFor(origin);
  if(req.method==='OPTIONS')return new Response('ok',{headers:cors});
  if(req.method!=='POST')return json({error:'Method not allowed'},405,cors);
  if(origin&&!allowedOrigins.has(origin)&&!origin.startsWith('http://127.0.0.1:'))return json({error:'Origin not allowed'},403,cors);
  const {question}=await req.json().catch(()=>({question:''}));if(typeof question!=='string'||question.trim().length<12||question.length>1500)return json({error:'Question must contain 12–1500 characters.'},400);
  if(refuse.test(question))return json({answer:'I can explain the underlying theory and the questions a competent engineer should verify, but I cannot approve, size, select, bypass, or issue a safety-critical method. Reframe this as a conceptual question.'});
  const service=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const raw=(req.headers.get('x-forwarded-for')||'unknown').split(',')[0]+req.headers.get('user-agent');const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(raw)))).map(b=>b.toString(16).padStart(2,'0')).join('');
  const since=new Date(Date.now()-86400000).toISOString();const {count}=await service.from('ai_usage').select('*',{count:'exact',head:true}).eq('client_hash',digest).gte('created_at',since);if((count||0)>=5)return json({error:'Free daily allowance reached. Please return tomorrow.'},429);
  const key=Deno.env.get('OPENROUTER_API_KEY');if(!key)return json({error:'AI provider is not configured.'},503);
  const system=`You are Anchor Point's educational engineering theory assistant. Explain concepts, equations, variables, units, assumptions, limitations, and verification questions. Never make an engineering decision; approve/certify a design; select or size equipment; give a site method, bypass, emergency instruction, or exact safety-critical setting; fabricate a standard clause; or imply professional authority. State uncertainty. Separate theory from project-specific facts. End with “Verify next:” and 2–4 authoritative source types or checks. Keep the answer under 450 words.`;
  const upstream=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json','HTTP-Referer':'https://anchorpoint.com.bd','X-Title':'Anchor Point Engineering Hub'},body:JSON.stringify({model:'openrouter/free',messages:[{role:'system',content:system},{role:'user',content:question}],temperature:.2,max_tokens:700,provider:{zdr:true}})});
  if(!upstream.ok)return json({error:'The free AI provider is temporarily unavailable.'},503);const data=await upstream.json();const answer=data.choices?.[0]?.message?.content;if(!answer)return json({error:'No answer was returned.'},503);
  await service.from('ai_usage').insert({client_hash:digest,model:data.model||'openrouter/free'});return json({answer,model:data.model||'openrouter/free'});
});
function json(body:unknown,status=200,cors:Record<string,string>=corsFor('https://anchorpoint.com.bd')){return new Response(JSON.stringify(body),{status,headers:{...cors,'Content-Type':'application/json','Cache-Control':'no-store'}})}
