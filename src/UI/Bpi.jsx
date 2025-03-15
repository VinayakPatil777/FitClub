import React, { useState } from "react";

const Bpi = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [dietPlan, setDietPlan] = useState("");

  const calculateBMI = (w, h) => {
    if (!w || !h || w <= 0 || h <= 0) {
      return null;
    }
    const heightInMeters = h / 100;
    return (w / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue >= 18.5 && bmiValue < 24.9) return "Normal Weight";
    if (bmiValue >= 25 && bmiValue < 29.9) return "Overweight";
    return "Obese";
  };

  const getDietPlan = (bmiValue) => {
    if (bmiValue < 18.5) {
      return "Increase calorie intake with proteins, healthy fats, and whole grains.";
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      return "Maintain a balanced diet with vegetables, fruits, lean protein, and healthy carbs.";
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      return "Reduce sugar intake, eat more fiber, and exercise regularly.";
    } else {
      return "Follow a low-carb diet, avoid junk food, and engage in regular exercise.";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bmiValue = calculateBMI(parseFloat(weight), parseFloat(height));
    setBmi(bmiValue);
    setCategory(getBMICategory(bmiValue));
    setDietPlan(getDietPlan(bmiValue));
  };

  return (
    <div style={styles.container}>
      <div style={styles.topContainer}>
        <div style={styles.calculatorContainer}>
          <h1 style={styles.header}>BMI Calculator</h1>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Weight (kg):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kg"
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Height (cm):</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height in cm"
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>
              Calculate BMI
            </button>
          </form>
        </div>
        <div style={styles.suggestionContainer}>
          <h2 style={styles.subHeader}>Results & Diet Suggestions</h2>
          {bmi !== null ? (
            <div style={styles.suggestionBox}>
              <p>
                Your BMI is: <strong>{bmi}</strong>
              </p>
              <p>
                Category: <strong>{category}</strong>
              </p>
              <p>
                Diet Suggestion: <strong>{dietPlan}</strong>
              </p>
            </div>
          ) : (
            <p>Calculate your BMI to see results and diet suggestions.</p>
          )}
        </div>
      </div>
      <div style={styles.chartContainer}>
        <h2 style={styles.subHeader}>BMI Chart</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>BMI Range</th>
              <th style={styles.tableHeader}>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Below 18.5</td>
              <td>Underweight</td>
            </tr>
            <tr>
              <td>18.5 - 24.9</td>
              <td>Normal Weight</td>
            </tr>
            <tr>
              <td>25 - 29.9</td>
              <td>Overweight</td>
            </tr>
            <tr>
              <td>30 & Above</td>
              <td>Obese</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    minHeight: "100vh",
    padding: "20px",
  },
  topContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "900px",
    marginBottom: "40px",
    gap: "20px",
  },
  calculatorContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    height : "335px"
  },
  header: {
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  subHeader: {
    marginBottom: "15px",
    color: "#333",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    color: "#555",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#667eea",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  suggestionBox: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    color: "#333",
    fontSize: "16px",
    textAlign: "center",
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "900px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    borderBottom: "2px solid #ccc",
    padding: "8px",
    textAlign: "center",
  },
};

export default Bpi;
