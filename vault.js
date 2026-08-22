const cfg=window.AP_CONFIG||{};
const login=document.querySelector('#login'),dash=document.querySelector('#dashboard');
const loginStatus=document.querySelector('#status'),enroll=document.querySelector('#mfaEnroll'),challenge=document.querySelector('#mfaChallenge');
let client=null,enrollFactorId=null,challengeFactorId=null;
const panels=[login,enroll,challenge,dash];
function show(panel){panels.forEach(p=>{if(p===dash)p.classList.toggle('active',p===panel);else p.hidden=p!==panel});}
function setText(selector,text){document.querySelector(selector).textContent=text}

async function gate(){
  const {data:{session}}=await client.auth.getSession();
  if(!session){show(login);return}
  const levels=await client.auth.mfa.getAuthenticatorAssuranceLevel();
  if(levels.error){show(login);loginStatus.textContent='Security status could not be verified.';return}
  if(levels.data.currentLevel==='aal2'){show(dash);return}
  const factors=await client.auth.mfa.listFactors();
  const verified=factors.data?.totp?.find(f=>f.status==='verified');
  if(verified){challengeFactorId=verified.id;show(challenge);return}
  show(enroll);
  const unverified=factors.data?.totp?.find(f=>f.status==='unverified');
  if(unverified)await client.auth.mfa.unenroll({factorId:unverified.id});
  const started=await client.auth.mfa.enroll({factorType:'totp',friendlyName:'Anchor Point Vault'});
  if(started.error){setText('#enrollStatus',started.error.message);return}
  enrollFactorId=started.data.id;
  document.querySelector('#vaultMfaQr').src=started.data.totp.qr_code;
  setText('#vaultMfaSecret',started.data.totp.secret);
}
if(!cfg.SUPABASE_URL||!cfg.SUPABASE_ANON_KEY){loginStatus.textContent='Vault backend is not configured yet.';show(login)}
else{
  client=supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);
  gate();
  client.auth.onAuthStateChange(event=>{if(event==='SIGNED_OUT')show(login)});
}
document.querySelector('#loginForm').addEventListener('submit',async event=>{
  event.preventDefault();loginStatus.textContent='Signing in…';
  const email=document.querySelector('#email').value,password=document.querySelector('#password').value;
  const {error}=await client.auth.signInWithPassword({email,password});
  if(error){loginStatus.textContent='Sign-in failed. Check credentials or request a fresh invitation.';return}
  loginStatus.textContent='';await gate();
});
document.querySelector('#enrollMfaForm').addEventListener('submit',async event=>{
  event.preventDefault();setText('#enrollStatus','Verifying…');
  const code=document.querySelector('#enrollMfaCode').value.trim();
  const c=await client.auth.mfa.challenge({factorId:enrollFactorId});
  if(c.error){setText('#enrollStatus',c.error.message);return}
  const v=await client.auth.mfa.verify({factorId:enrollFactorId,challengeId:c.data.id,code});
  if(v.error){setText('#enrollStatus','Code not accepted. Wait for a new code and try again.');return}
  await gate();
});
document.querySelector('#challengeMfaForm').addEventListener('submit',async event=>{
  event.preventDefault();setText('#challengeStatus','Verifying…');
  const code=document.querySelector('#challengeMfaCode').value.trim();
  const c=await client.auth.mfa.challenge({factorId:challengeFactorId});
  if(c.error){setText('#challengeStatus',c.error.message);return}
  const v=await client.auth.mfa.verify({factorId:challengeFactorId,challengeId:c.data.id,code});
  if(v.error){setText('#challengeStatus','Code not accepted. Wait for a new code and try again.');return}
  await gate();
});
document.querySelector('#signout').addEventListener('click',()=>client?.auth.signOut());
