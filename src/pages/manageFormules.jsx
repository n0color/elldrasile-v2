import { useState, useEffect } from "react";
import Header from "../components/header";
import "../styles/formules.scss";
import "../styles/index.scss";
import Footer from "../components/footer";

export default function ManageFormules() {
  const [formules, setFormules] = useState([]);
  const [countOfDice, setCountOfDice] = useState(0);
  const [newFormula, setnewFormula] = useState("MainState");
  const [Mod, setMod] = useState("");
  const [Name, setName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("formules")) {
      try {
        const savedFormulas = JSON.parse(localStorage.getItem("formules"));
        if (Array.isArray(savedFormulas)) {
          setFormules(savedFormulas);
        }
      } catch (error) {
        console.error('Ошибка загрузки формул:', error);
      }
    }
  }, []);

  function HandleAddDice(value) {
    const diceCount = parseInt(value);
    setCountOfDice(diceCount);
    
    // Очищаем формулу от старых кубиков
    let cleanFormula = newFormula.replace(/\*\(d6.*?\)/g, '');
    
    // Добавляем новые кубики
    switch (diceCount) {
      case 1:
        cleanFormula += '*(d6)';
        break;
      case 2:
        cleanFormula += '*(d6+secd6)';
        break;
      case 3:
        cleanFormula += '*(d6+secd6+tripd6)';
        break;
      default:
        break;
    }
    
    setnewFormula(cleanFormula);
  }

  function HandleRedactModificator(value) {
    setMod(value);
    
    if (!value || value === '') {
      // Убираем модификатор из формулы
      let cleanedFormula = newFormula.replace(/^\d+(\.\d+)?\*/g, '');
      setnewFormula(cleanedFormula);
    } else {
      // Добавляем модификатор в начало формулы
      let cleanedFormula = newFormula.replace(/^\d+(\.\d+)?\*/g, '');
      setnewFormula(value + "*" + cleanedFormula);
    }
  }

  function addNewFormula() {
    if (!Name.trim()) {
      alert("Введите название формулы");
      return;
    }

    const newId = Date.now();

    // Создаем массив inputs
    let inputs = [
      { key: "MS", label: "Атакующий стат" },
      { key: "Consta", label: "Модификатор" },
    ];

    if (countOfDice >= 1) {
      inputs.push({ key: "d6", label: "D6 кубик" });
    }
    if (countOfDice >= 2) {
      inputs.push({ key: "secd6", label: "Второй D6 кубик" });
    }
    if (countOfDice >= 3) {
      inputs.push({ key: "tripd6", label: "Третий D6 кубик" });
    }

    // Создаем финальную формулу, заменяя плейсхолдеры на функции
    let formula = newFormula
      .replace(/MainState/g, 'MS')
      .replace(/\(d6\)/g, 'calculateD6Multiplier(d6)')
      .replace(/\(d6\+secd6\)/g, 'calculateDoubleD6Multiplier(d6+secd6)')
      .replace(/\(d6\+secd6\+tripd6\)/g, 'calculateDoubleD6Multiplier(d6+secd6+tripd6)')
      + ' + Consta';

    const newFormulaObj = {
      id: newId,
      name: Name,
      inputs: inputs,
      formula: formula,
    };

    const updatedFormules = [...formules, newFormulaObj];
    setFormules(updatedFormules);
    localStorage.setItem('formules', JSON.stringify(updatedFormules));
    
    // Очищаем форму
    setnewFormula("MainState");
    setName("");
    setCountOfDice(0);
    setMod("");
  }

  function delFormula(formulaId) {
    const oldformules = JSON.parse(localStorage.getItem('formules'));
    const updatedFormules = oldformules.filter((formula) => formula.id !== formulaId);
    localStorage.setItem('formules', JSON.stringify(updatedFormules));
    setFormules(updatedFormules);
  }

  return (
    <>
      <Header />
      <div className="calcDiv">
        <h1>Управление формулами</h1>
        <h2>Формулы</h2>
        {formules.length > 0  ? formules.map((formule) => (
          <div key={formule.id}>
            <h3>{formule.name}</h3>
            <p>{formule.formula}</p>
            <button type="button" id={formule.id} onClick={e => delFormula(formule.id)}>Удалить формулу</button>
          </div>
        )) : <p className="minitext">Тут ничего нет</p>}
        <h2>Добавить формулу</h2>
        <input type="text" placeholder="Название формулы" onChange={(e) => setName(e.target.value)} value={Name}/>
        <input type="number" placeholder="Множитель вашей атк статы" onChange={(e) => HandleRedactModificator(e.target.value)} value={Mod}/>
        <label htmlFor="numberOfDice">Количество кубиков</label>
        <select name="numberOfDice" onChange={(e) => HandleAddDice(e.target.value)} value={countOfDice}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <label htmlFor="numberOfDice">Формула: </label>
        <input type="text" placeholder="Итоговая формула" value={newFormula} onChange={(e) => setnewFormula(e.target.value)}/>
        <button onClick={() => addNewFormula()}>Добавить</button>
      </div>
      <Footer />
    </>
  );
}
