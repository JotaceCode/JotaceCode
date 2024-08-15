import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Command } from "commander";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Archivo de almacenamiento de datos
const DATA_DIR = join(__dirname, "gastos");
const DATA_FILE = join(DATA_DIR, "expenses.json");

// Verifica y crea el directorio si no existe
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`Directorio creado: ${DATA_DIR}`);
}

// Función para cargar datos desde el archivo
function loadData() {
  if (existsSync(DATA_FILE)) {
    const data = readFileSync(DATA_FILE);
    return JSON.parse(data);
  }
  return [];
}

// Función para guardar datos en el archivo
function saveData(data) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));
}

/**
 * 
 * @param {*} description - descripcion del gasto
 * @param {*} amount - 
 */
// Función para agregar un gasto
function addExpense(description, amount) {
  const expenses = loadData();
  const newExpense = {
    id: expenses.length + 1,
    date: new Date().toISOString().split("T")[0],
    description,
    amount: parseFloat(amount),
  };
  expenses.push(newExpense);
  saveData(expenses);
  console.log(`Gasto agregado exitosamente (ID: ${newExpense.id})`);
}

// Función para listar todos los gastos
function listExpenses() {
  const expenses = loadData();
  console.log("ID  Date       Description  Amount");
  expenses.forEach((exp) => {
    console.log(`${exp.id}   ${exp.date}  ${exp.description}  $${exp.amount}`);
  });
}

// Función para eliminar un gasto por ID
function deleteExpense(id) {
  let expenses = loadData();
  const initialLength = expenses.length;
  expenses = expenses.filter((exp) => exp.id !== parseInt(id));
  if (expenses.length < initialLength) {
    saveData(expenses);
    console.log("Gasto eliminado exitosamente");
  } else {
    console.log("ID no encontrado");
  }
}

// Función para mostrar el resumen de gastos
function summary(month = null) {
  const expenses = loadData();
  if (month) {
    const monthExpenses = expenses.filter((exp) => {
      const expenseMonth = new Date(exp.date).getMonth() + 1;
      return expenseMonth === parseInt(month);
    });
    const total = monthExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    console.log(`Total de gastos para el mes ${month}: $${total}`);
  } else {
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    console.log(`Total de gastos: $${total}`);
  }
}

// Configurar comandos CLI
const program = new Command();

program
  .command("add")
  .description("Agregar un gasto")
  .requiredOption("--description <description>", "Descripción del gasto")
  .requiredOption("--amount <amount>", "Monto del gasto")
  .action((options) => {
    addExpense(options.description, options.amount);
  });

program
  .command("list")
  .description("Listar todos los gastos")
  .action(() => {
    listExpenses();
  });

program
  .command("delete")
  .description("Eliminar un gasto")
  .requiredOption("--id <id>", "ID del gasto a eliminar")
  .action((options) => {
    deleteExpense(options.id);
  });

program
  .command("summary")
  .description("Ver resumen de gastos")
  .option("--month <month>", "Mes específico (opcional)")
  .action((options) => {
    summary(options.month);
  });

program.parse(process.argv);
