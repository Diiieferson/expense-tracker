import { useState, useEffect } from 'react'
import * as C from './App.styles'
import { Item } from './types/Item'
import { Category } from './types/category'
import { items } from './data/items'
import { categories } from './data/categories'
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter'
import { TableArea } from './components/tableArea'
import { InfoArea } from './components/InfoArea'

const App = ()=> {
  const [list, setList] = useState(items)
  const [filterList, setFilterList] = useState<Item[]>([])
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  
  useEffect(()=>{
    setFilterList( filterListByMonth(list, currentMonth))
  },[list, currentMonth])

  useEffect(()=>{
    let IncomeCount = 0
    let expenseCount = 0
    for(let i in filterList){
      if(categories[filterList[i].category].expense){
        expenseCount += filterList[i].value
      }else{
        IncomeCount += filterList[i].value
      }
    }

    setIncome(IncomeCount)
    setExpense(expense)

  },[filterList])

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth)
  }
  return(
    <C.Container>
      <C.Header>
        <C.HeaderText>
          Sistema Financeiro 
        </C.HeaderText>
      </C.Header>
      <C.Body>

        <InfoArea 
          currentMonth={currentMonth} 
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
          />


        {/* ÁREA DE INSERÇÃO */}

        <TableArea list={filterList} ></TableArea>
      
      
      </C.Body>
    </C.Container>
  )
}

export default App