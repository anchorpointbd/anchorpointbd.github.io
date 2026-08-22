const cfg=window.AP_CONFIG||{};
const statusEl=document.querySelector('#authStatus');
const passwordForm=document.querySelector('#passwordForm');
const mfaSetup=document.querySelector('#mfaSetup');
const complete=document.querySelector('#authComplete');
let client=null,factorId=null;

function message(text,isError=false){statusEl.textContent=text;statusEl.classList.toggle('auth-error',isError)}
function show(el){[passwordForm,mfaSetup,complete].forEach(node=>node.hidden=node!==el)}

async function beginMfa(){
  message('Password saved. Preparing authenticator security…');
  const listed=await client.auth.mfa.listFactors();
  if(listed.error)throw listed.error;
  const verified=listed.data?.totp?.find(f=>f.status==='verified');
  if(verified){show(complete);message('This account already has an authenticator attached.');return}
  for(const stale of listed.data?.totp?.filter(f=>f.status==='unverified')||[])await client.auth.mfa.unenroll({factorId:stale.id});
  const {data,error}=await client.auth.mfa.enroll({factorType:'totp',friendlyName:'Anchor Point Vault'});
  if(error)throw error;
  factorId=data.id;
  document.querySelector('#mfaQr').src=data.totp.qr_code;
  document.querySelector('#mfaSecret').textContent=data.totp.secret;
  show(mfaSetup);message('Scan the QR code, then verify one code from your authenticator app.');
}

async function detectInvitation(){
  if(!cfg.SUPABASE_URL||!cfg.SUPABASE_ANON_KEY){message('The Vault connection is not configured.',true);return}
  client=supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY,{auth:{detectSessionInUrl:true,persistSession:true}});
  const {data,error}=await client.auth.getSession();
  if(error){message('The invitation could not be verified. Request a fresh invitation.',true);return}
  if(data.session){show(passwordForm);message('Invitation verified. Create a private password to continue.');return}
  let settled=false;
  const {data:{subscription}}=client.auth.onAuthStateChange((_event,session)=>{
    if(session&&!settled){settled=true;subscription.unsubscribe();show(passwordForm);message('Invitation verified. Create a private password to continue.')}
  });
  setTimeout(()=>{if(!settled){subscription.unsubscribe();message('This invitation is invalid, already used, or expired. Ask the administrator to send a fresh invitation after confirming this exact page is allowed in Supabase.',true)}},3500);
}

passwordForm.addEventListener('submit',async event=>{
  event.preventDefault();
  const password=document.querySelector('#newPassword').value;
  if(password!==document.querySelector('#confirmPassword').value){message('The two passwords do not match.',true);return}
  message('Saving password…');
  const {error}=await client.auth.updateUser({password});
  if(error){message(error.message||'The password could not be saved.',true);return}
  try{await beginMfa()}catch(error){message(error.message||'Authenticator setup could not start.',true)}
});

document.querySelector('#mfaForm').addEventListener('submit',async event=>{
  event.preventDefault();message('Verifying authenticator code…');
  const code=document.querySelector('#mfaCode').value.trim();
  const challenged=await client.auth.mfa.challenge({factorId});
  if(challenged.error){message(challenged.error.message,true);return}
  const verified=await client.auth.mfa.verify({factorId,challengeId:challenged.data.id,code});
  if(verified.error){message('That code was not accepted. Wait for a new code and try again.',true);return}
  show(complete);message('Invitation accepted and multi-factor authentication enabled.');
});

detectInvitation();
