//<div class="item">
   //   <div class="item-criado" draggable="true">card1</div>
  //    <input type="button" value="X">
 //   </div>

let banco = []


const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

const btn = document.querySelector('.criar')
const campo = document.querySelector('.valor')


const inserirTarefa2 = ()=>{
  
    banco.push({'tarefa': campo.value})
    setBanco(banco)
    render()
 }

btn.addEventListener('click', inserirTarefa2)


const criarItem = (tarefa,index) =>{
  const item = document.createElement('div')
  item.classList.add('item')
  item.setAttribute('draggable', 'true')
  item.innerHTML = `<div class="item-criado" ><div>${tarefa}</div>
      <input type="button" value="X" data-index=${index}> </div>`
      

  document.getElementById('first-column').appendChild(item)   
  
  
}



const render = () =>{
  
  limparTarefas()
  const banco = getBanco()
  banco.forEach((item, index)=>{
    criarItem(item.tarefa, index)
    console.log(criarItem(item.tarefa, index))
 })

}

 const inserirTarefa = (evento)=>{
  const tecla = evento.key
  const texto = evento.target.value
  if(tecla === 'Enter'){
    banco.push({'tarefa': texto})
    setBanco(banco)
    render()
    evento.target.value = ''
    
  }
 }


 const removerItem = (item,index)=>{
  const banco = getBanco();
    banco.splice(index,1)
    setBanco(banco)
    render(item)
    
}

 const clickItem = (event)=>{
   let elemento = event.target;
   if(elemento.type === 'button'){
     const index = elemento.dataset.index
     removerItem(elemento, index);
     render()
   }
   console.log(event.target.parentNode.parentNode)
  }


const limparTarefas = ()=>{
const coluns = document.querySelectorAll('.column')

  coluns.forEach((item)=>{
    while(item.firstChild)
      item.removeChild(item.firstChild)
  })
}


document.getElementById('newItem').addEventListener('keypress',inserirTarefa)
document.querySelectorAll('.column').forEach(()=>{
  addEventListener('click', clickItem)
}) 

render()


const columns = document.querySelectorAll('.column')
console.log(columns)
document.addEventListener('dragstart',(e) => {
  e.target.classList.add('dragging')
})

document.addEventListener('dragend',(e) => {
  e.target.classList.remove('dragging')
})

columns.forEach((item)=>{
  item.addEventListener('dragover', (e)=>{
    const dragging = document.querySelector('.dragging')
    const applyAfter = getNewPosition(item, e.clientY)

    if(applyAfter){
      applyAfter.insertAdjacentElement('afterend',dragging)
    }else{
      item.prepend(dragging)
    }
  })
})

function getNewPosition(column, posY){
  const cards = column.querySelectorAll('.item:not(.dragging)')
  let result

  for( let refer_card of cards){
    const box = refer_card.getBoundingClientRect()
    const boxCenterY = box.y + box.height / 2

    if(posY >= boxCenterY) result = refer_card
  }
  return result
}