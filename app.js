const KEY='royalClubDemoV1';
const initial={balance:10000,records:[],draws:[],round:1,issue:1};
let data=load(),choice='player';
function load(){try{return {...{balance:10000,records:[],draws:[],round:1,issue:1},...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {balance:10000,records:[],draws:[],round:1,issue:1}}}
function save(){localStorage.setItem(KEY,JSON.stringify(data));render()}
function fmt(n){return Number(n).toLocaleString('en-US')}
function time(){return new Date().toLocaleString('zh-CN',{hour12:false})}
function toast(s){let el=document.getElementById('toast');el.textContent=s;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
function render(){
 ['balance','balance2','statBalance'].forEach(id=>{let e=document.getElementById(id);if(e)e.textContent=fmt(data.balance)});
 document.getElementById('statGames').textContent=data.records.filter(x=>x.type==='百家乐').length;
 document.getElementById('statDraws').textContent=data.draws.length;
 renderRecords();renderDrawHistory();renderRoad();
}
function page(id){document.querySelectorAll('.page').forEach(x=>x.classList.toggle('active',x.id===id));document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('active',x.dataset.page===id));window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>page(b.dataset.page)));
document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>page(b.dataset.goto)));
document.querySelectorAll('.bet-option').forEach(b=>b.addEventListener('click',()=>{choice=b.dataset.choice;document.querySelectorAll('.bet-option').forEach(x=>x.classList.toggle('selected',x===b))}));
document.querySelectorAll('[data-stake]').forEach(b=>b.addEventListener('click',()=>document.getElementById('stake').value=b.dataset.stake));
document.getElementById('minus').onclick=()=>changeStake(-10);document.getElementById('plus').onclick=()=>changeStake(10);
function changeStake(v){let e=document.getElementById('stake');e.value=Math.max(10,Math.min(5000,(Number(e.value)||100)+v))}
function card(){let suits=['♠','♥','♦','♣'],ranks=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];let i=Math.floor(Math.random()*13);return {rank:ranks[i],suit:suits[Math.floor(Math.random()*4)],value:i===0?1:i>=9?0:i+1}}
function hand(){let c=[card(),card()];return {cards:c,score:c.reduce((s,x)=>s+x.value,0)%10}}
function face(c){return `<div class="playing-card-face ${['♥','♦'].includes(c.suit)?'red':''}">${c.rank}<span>${c.suit}</span></div>`}
function deal(){
 let stake=Math.floor(Number(document.getElementById('stake').value));if(!Number.isFinite(stake)||stake<10||stake>5000){toast('请输入 10–5,000 之间的模拟积分');return}if(stake>data.balance){toast('虚拟积分不足');return}
 data.balance-=stake;
 let p=hand(),b=hand();
 if(p.score<6){let c=card();p.cards.push(c);p.score=(p.score+c.value)%10}
 if(b.score<6){let c=card();b.cards.push(c);b.score=(b.score+c.value)%10}
 let winner=p.score>b.score?'player':b.score>p.score?'banker':'tie';
 let payout=winner===choice?(choice==='tie'?stake*9:stake*2):0;
 data.balance+=payout;
 let net=payout-stake;
 let names={player:'闲家胜',banker:'庄家胜',tie:'和局'};
 document.getElementById('playerCards').innerHTML=p.cards.map(face).join('');
 document.getElementById('bankerCards').innerHTML=b.cards.map(face).join('');
 document.getElementById('playerScore').textContent=p.score;
 document.getElementById('bankerScore').textContent=b.score;
 document.getElementById('gameResult').textContent=names[winner];
 document.getElementById('roundNo').textContent='ROUND '+String(data.round).padStart(4,'0');
 let outcome=winner===choice?'模拟命中':'未命中';
 data.records.unshift({type:'百家乐',choice:{player:'闲',banker:'庄',tie:'和'}[choice],result:names[winner]+' · '+outcome,delta:net,time:time()});
 data.records=data.records.slice(0,100);data.round++;save();toast(outcome+(payout?`，积分变化 ${net>=0?'+':''}${fmt(net)}`:'，本局积分已扣除'));
}
document.getElementById('deal').onclick=deal;
function renderRoad(){let road=document.getElementById('road');let arr=data.records.filter(x=>x.type==='百家乐').slice(0,18);road.innerHTML=arr.length?arr.map(x=>{let cls=x.result.includes('闲家')?'player':x.result.includes('庄家')?'banker':'tie';return `<span class="road-dot ${cls}">${cls==='player'?'闲':cls==='banker'?'庄':'和'}</span>`}).join(''):'<span class="muted">暂无结果</span>'}
function drawNumbers(){
 let nums=[];while(nums.length<7){let n=1+Math.floor(Math.random()*49);if(!nums.includes(n))nums.push(n)}
 let issue='RC-'+String(data.issue).padStart(6,'0'),stamp=time();
 data.draws.unshift({issue,nums,time:stamp});data.draws=data.draws.slice(0,30);
 document.getElementById('drawIssue').textContent='模拟期号 '+issue;
 document.getElementById('lotteryBalls').innerHTML=nums.map((n,i)=>`<span class="ball ${i===6?'special':''}">${String(n).padStart(2,'0')}</span>`).join('');
 data.records.unshift({type:'模拟六合彩',choice:'随机生成',result:nums.map(n=>String(n).padStart(2,'0')).join(' · '),delta:0,time:stamp});
 data.records=data.records.slice(0,100);data.issue++;save();toast('已生成一组随机模拟号码');
}
document.getElementById('draw').onclick=drawNumbers;
function renderDrawHistory(){let el=document.getElementById('lotteryHistory');el.innerHTML=data.draws.length?data.draws.slice(0,8).map(d=>`<div class="history-row"><span>${d.issue}</span><span class="numbers">${d.nums.map(n=>String(n).padStart(2,'0')).join(' · ')}</span><span class="time">${d.time}</span></div>`).join(''):'<div class="empty">尚无开奖记录</div>'}
function renderRecords(){let el=document.getElementById('gameHistory');el.innerHTML=data.records.length?data.records.map(r=>`<div class="history-row record-row"><span class="time">${r.time}</span><span>${r.type} / ${r.choice}</span><span>${r.result}</span><span class="${r.delta>0?'positive':r.delta<0?'negative':''}">${r.delta>0?'+':''}${fmt(r.delta)}</span></div>`).join(''):'<div class="empty">暂无游戏记录</div>'}
document.getElementById('reset').onclick=()=>{if(confirm('确定清除本机全部虚拟积分、游戏记录及模拟开奖数据？此操作无法撤销。')){data={...initial,records:[],draws:[]};save();document.getElementById('playerCards').innerHTML='<div class="card-back">♛</div><div class="card-back">♛</div>';document.getElementById('bankerCards').innerHTML='<div class="card-back">♛</div><div class="card-back">♛</div>';document.getElementById('playerScore').textContent='—';document.getElementById('bankerScore').textContent='—';document.getElementById('gameResult').textContent='等待开始';document.getElementById('lotteryBalls').innerHTML=Array(7).fill('<span class="ball placeholder">?</span>').join('');toast('本机演示数据已重置')}}
render();