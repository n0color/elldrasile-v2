import Header from "../components/header";
import InputComponent from "../components/inputComponent";
import "../formules.scss";
import { useState } from "react";

const formulas = [
  {
    id: "1",
    name: "",
    inputs: [
      { key: "MS", label: "Атакующий стат" },
      { key: "Consta", label: "Константа" },
      { key: "d6", label: "D6 кубик" },
      { key: "secd6", label: "Второй D6 кубик" }
    ],
    realForm: ({ MS, Consta, d6, secd6 }) => M0366ath.floor(MS * d6 + Consta + secd6)
  },
  {
    id: "2",
    name: "222",
    inputs: [
      { key: "MS", label: "Атакующий стат" },
      { key: "Consta", label: "Константа" },
      { key: "d6", label: "D6 кубик" }
    ],
    realForm: ({ MS, Consta, d6 }) => Math.floor(MS * d6 + Consta)
  }
  // Добавляй новые формулы по аналогии!
];

export default function Calculate() {
  const [selectedId, setSelectedId] = useState(formulas[0].id);
  const selectedFormula = formulas.find(f => f.id === selectedId);

  // Состояние для всех инпутов (ключи совпадают с key в inputs)
  const [inputs, setInputs] = useState(
    Object.fromEntries(selectedFormula.inputs.map(i => [i.key, 0]))
  );
  const [result, setResult] = useState(null);

  // При смене формулы сбрасываем значения инпутов и результат
  function handleSelect(e) {
    const newId = e.target.value;
    setSelectedId(newId);
    const newFormula = formulas.find(f => f.id === newId);
    setInputs(Object.fromEntries(newFormula.inputs.map(i => [i.key, 0])));
    setResult(null);
  }

  // Обновление значения конкретного инпута
  function handleInputChange(key, value) {
    setInputs(prev => ({ ...prev, [key]: value }));
  }

  // Вычисление результата
  function handleCalc() {
    // Преобразуем все значения к числам
    const values = {};
    for (const key of Object.keys(inputs)) {
      values[key] = Number(inputs[key]) || 0;
    }
    setResult(selectedFormula.realForm(values));
  }
  console.log(inputs)
  return (
    <>
      <Header />
      <div className="calcDiv">
      <select onChange={handleSelect} value={selectedId}>
        {formulas.map(f => (
          <option key={f.id} value={f.id}>{f.name}</option>
        ))}
      </select>
      {selectedFormula.inputs.map(input => (
        <InputComponent
          key={input.key}
          value={inputs[input.key]}
          name={input.key}
          rusName={input.label}
          setValue={val => handleInputChange(input.key, val)}
        />
      ))}
      <button onClick={handleCalc}>Рассчитать</button>
      {result !== null && <div>Результат: {result}</div>}
      </div>
    </>
  );
}