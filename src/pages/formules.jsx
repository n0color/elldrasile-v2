import Header from "../components/header";
import InputComponent from "../components/inputComponent";
import "../styles/formules.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router";

// Функции-множители
const calculateD6Multiplier = (d6) => {
  const multipliers = {
    1: 1.25,
    2: 1.1,
    3: 1,
    4: 1,
    5: 0.9,
    6: 0.75
  };
  return multipliers[d6] || 1;
};

const calculateDoubleD6Multiplier = (SUMD6) => { 
  const multipliers = {
    2: 1.25,
    3: 1.1,
    4: 1,
    5: 1,
    6: 0.9,
    7: 0.75,
    8: 0.75,
    9: 0.75,
    10: 0.75,
    11: 0.75,
    12: 0.75
  };
  return multipliers[SUMD6] || 1;
};

// Базовые формулы
const defaultFormulas = [
  {
    id: "unique1",
    name: "Удар рукой",
    inputs: [
      { key: "MS", label: "Сила" },
      { key: "Consta", label: "Модификатор" },
      { key: "d6", label: "D6 кубик" },
    ],
    formula: "0.25*MS*calculateD6Multiplier(d6) + Consta",
  },
  {
    id: "unique2",
    name: "Удар ногой",
    inputs: [
      { key: "MS", label: "Сила" },
      { key: "Consta", label: "Модификатор" },
      { key: "d6", label: "D6 кубик" },
      { key: "secd6", label: "Второй D6 кубик" }
    ],
    formula: "0.25*MS*calculateDoubleD6Multiplier(d6+secd6) + Consta",
  }
];

export default function Calculate() {
  const [formulas, setFormulas] = useState(defaultFormulas);
  const [selectedId, setSelectedId] = useState("");
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем формулы из localStorage
  useEffect(() => {
    try {
      const savedFormulas = localStorage.getItem("formules");
      let allFormulas = [...defaultFormulas];
      
      if (savedFormulas) {
        const parsedFormulas = JSON.parse(savedFormulas);
        if (Array.isArray(parsedFormulas)) {
          // Преобразуем ID в строки для совместимости
          const normalizedFormulas = parsedFormulas.map(formula => ({
            ...formula,
            id: String(formula.id)
          }));
          allFormulas = [...defaultFormulas, ...normalizedFormulas];
        }
      }
      
      setFormulas(allFormulas);
      
      // Устанавливаем первую формулу как выбранную
      if (allFormulas.length > 0) {
        setSelectedId(String(allFormulas[0].id));
      }
      
    } catch (error) {
      console.error('Ошибка загрузки формул:', error);
      setSelectedId(defaultFormulas[0].id);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Инициализируем inputs при изменении выбранной формулы
  useEffect(() => {
    if (selectedId && formulas.length > 0) {
      const selectedFormula = formulas.find(f => String(f.id) === String(selectedId));
      if (selectedFormula && selectedFormula.inputs) {
        const initialInputs = {};
        selectedFormula.inputs.forEach(input => {
          initialInputs[input.key] = 0;
        });
        setInputs(initialInputs);
        setResult(null);
      }
    }
  }, [selectedId, formulas]);
  
  const selectedFormula = formulas.find(f => String(f.id) === String(selectedId));

  // Обработка смены формулы
  function handleSelect(e) {
    setSelectedId(String(e.target.value));
  }

  // Обновление значения инпута
  function handleInputChange(key, value) {
    setInputs(prev => ({ ...prev, [key]: Number(value) || 0 }));
  }

  // Вычисление результата
  function handleCalc() {
    if (!selectedFormula) return;
    
    try {
      // Создаем функцию с правильным контекстом
      const calculateFunction = new Function(
        'MS', 'Consta', 'd6', 'secd6', 'tripd6', 'calculateD6Multiplier', 'calculateDoubleD6Multiplier', 
        `return ${selectedFormula.formula}`
      );
      
      // Вызываем функцию с переданными значениями
      const result = calculateFunction(
        inputs.MS || 0, 
        inputs.Consta || 0, 
        inputs.d6 || 0, 
        inputs.secd6 || 0, 
        inputs.tripd6 || 0, 
        calculateD6Multiplier, 
        calculateDoubleD6Multiplier
      );
      
      console.log('Результат вычисления:', result);
      setResult(Math.floor(result));
    } catch (error) {
      console.error('Ошибка вычисления:', error);
      setResult(0);
    }
  }

  function rollD6() {
    if (!selectedFormula) return;
    
    const newInputs = { ...inputs };
    
    // Бросаем только те кубики, которые есть в выбранной формуле
    selectedFormula.inputs.forEach(input => {
      if (input.key === 'd6' || input.key === 'secd6' || input.key === 'tripd6') {
        newInputs[input.key] = Math.floor(Math.random() * 6) + 1;
      }
    });
    
    setInputs(newInputs);
  }

  // Сброс значений
  function resetValues() {
    if (!selectedFormula) return;
    
    const resetInputs = {};
    selectedFormula.inputs.forEach(input => {
      resetInputs[input.key] = 0;
    });
    setInputs(resetInputs);
    setResult(null);
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="calcDiv">
          <p>Загрузка формул...</p>
        </div>
      </>
    );
  }

  if (formulas.length === 0) {
    return (
      <>
        <Header />
        <div className="calcDiv">
          <p>Нет доступных формул</p>
          <Link to={"/manage"}>Создать формулу</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="calcDiv">
        <h1>Калькулятор формул</h1>
        
        <div style={{marginBottom: '20px'}}>
          <label htmlFor="formulaSelect">Выберите формулу:</label>
          <select 
            id="formulaSelect"
            onChange={handleSelect} 
            value={selectedId}
            style={{marginLeft: '10px', padding: '5px'}}
          >
            {formulas.map(f => (
              <option key={f.id} value={String(f.id)}>{f.name}</option>
            ))}
          </select>
        </div>

        <Link to={"/manage"} style={{display: 'block', marginBottom: '20px'}}>
          Управление формулами
        </Link>

        <div style={{marginBottom: '20px'}}>
          <h3>Параметры:</h3>
          {
            selectedFormula.inputs.map(input => (
              <InputComponent
                key={input.key}
                value={inputs[input.key] || 0}
                name={input.key}
                rusName={input.label}
                setValue={val => handleInputChange(input.key, val)}
              />
            ))
          }
        </div>

        {selectedFormula && (
          <>
            <div className="buttons">
              <button onClick={rollD6}>Бросить кубики</button>
              <button onClick={handleCalc}>Рассчитать</button>
              <button onClick={resetValues}>Сбросить</button>
            </div>
            <div>
              Результат: {result}
            </div>
            <div className="currentFormula">
              <strong>Текущая формула:</strong> {selectedFormula.formula}
            </div>
          </>
        )}
      </div>
    </>
  );
} 