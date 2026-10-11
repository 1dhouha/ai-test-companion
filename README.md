# 🧪 AI Test Companion

An **AI-powered web application for automated software testing** that helps generate, execute, and analyze test cases from a website URL and user story.

The platform combines **Generative AI** with **Selenium browser automation** to simplify the software testing workflow — from test-case generation to automated execution and result analysis.

---

## 🚀 Project Overview

Writing and maintaining test cases manually can be time-consuming, especially when applications contain many features and user flows.

**AI Test Companion** aims to automate part of this process by allowing users to provide:

* 🌐 A target website URL
* 📝 A user story
* 💡 Optional custom testing instructions

The system then uses an AI model to generate structured test cases, which can subsequently be executed automatically through Selenium.

### Workflow

```text
                 ┌──────────────────────┐
                 │       User           │
                 │                      │
                 │ Website URL          │
                 │ User Story           │
                 │ Custom Prompt        │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │     AI Test          │
                 │     Generation       │
                 │                      │
                 │ Generative AI        │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │    Test Cases        │
                 │                      │
                 │ • Functional         │
                 │ • Edge Cases         │
                 │ • Error Cases        │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Selenium Automation  │
                 │                      │
                 │ Browser Test         │
                 │ Execution            │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │    Test Results      │
                 │                      │
                 │ ✓ Passed             │
                 │ ✗ Failed             │
                 │ ⏱ Duration           │
                 │ 📊 Statistics        │
                 └──────────────────────┘
```

---

## ✨ Features

### 🤖 AI Test Generation

Generate structured test cases from a user story and target website.

Each generated test case can contain:

* Test ID
* Test name
* Description
* Test type
* Test steps
* Expected result
* Execution status

The backend API is designed around the `/api/generate-tests` endpoint for this workflow.

---

### 🌐 Website-Based Testing

The user provides the URL of the application that needs to be tested.

```text
https://example.com
```

The generated tests can then target this application during automated execution.

---

### 🧪 Automated Test Execution

Generated test cases can be executed through **Selenium**, allowing the application to interact with the target website through browser automation.

The backend exposes:

```text
POST /api/run-tests
```

for test execution.

---

### 📊 Test Results

After execution, the system can return information such as:

* Total tests
* Passed tests
* Failed tests
* Pending tests
* Execution duration
* Error messages
* Execution timestamp

Example:

```json
{
  "total": 5,
  "passed": 4,
  "failed": 1,
  "pending": 0
}
```

The backend structure explicitly defines these execution statistics.

---

## 🏗️ Architecture

The project is divided into two main parts:

```text
AI Test Companion
│
├── Frontend
│   ├── React
│   ├── TypeScript
│   ├── Vite
│   ├── Tailwind CSS
│   └── shadcn/ui
│
└── Backend
    ├── Python
    ├── FastAPI / Flask
    ├── Generative AI API
    └── Selenium
```

The GitHub repository currently contains dedicated `src`, `public`, and `backend` directories.

---

## 🛠️ Technologies

### Frontend

* **React 18**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **shadcn/ui**
* **React Router**
* **React Query**
* **Recharts**
* **Lucide React**

These dependencies are defined in the project's `package.json`.

### Backend

* **Python**
* **FastAPI / Flask**
* **Selenium**
* **REST API**
* **Generative AI API**
* **CORS**

The backend documentation defines both Flask and FastAPI implementations and the required API endpoints.

---

## 🔌 API

### Health Check

```http
GET /api/health
```

Returns:

```json
{
  "status": "ok"
}
```

---

### Generate Test Cases

```http
POST /api/generate-tests
```

Request:

```json
{
  "url": "https://example.com",
  "userStory": "As a user, I want to log in to my account",
  "customPrompt": "Focus on invalid login scenarios"
}
```

Response:

```json
{
  "success": true,
  "testCases": [
    {
      "id": "001",
      "name": "Invalid Login",
      "description": "Verify that invalid credentials are rejected",
      "type": "error",
      "steps": [
        "Open the login page",
        "Enter invalid credentials",
        "Click Login"
      ],
      "expectedResult": "An error message is displayed",
      "status": "pending"
    }
  ]
}
```

The repository's backend specification defines this endpoint and its test-case structure.

---

### Run Tests

```http
POST /api/run-tests
```

Request:

```json
{
  "url": "https://example.com",
  "testCases": []
}
```

The endpoint is designed to execute the generated test cases through Selenium and return execution results.

---

## 📁 Project Structure

```text
ai-test-companion/
│
├── backend/
│   └── Python backend
│
├── public/
│   └── Static assets
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

Make sure you have installed:

* **Node.js**
* **npm**
* **Python 3.x**
* **Google Chrome / Chromium**
* **ChromeDriver** or an appropriate Selenium driver

---

## 1. Clone the Repository

```bash
git clone https://github.com/1dhouha/ai-test-companion.git
```

```bash
cd ai-test-companion
```

---

## 2. Install Frontend Dependencies

```bash
npm install
```

The project uses Vite as its development server and provides the following scripts:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

These scripts are defined in `package.json`.

---

## 3. Start the Frontend

```bash
npm run dev
```

Vite will start the development server and provide the local URL.

---

## 4. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install the required Python dependencies.

For FastAPI:

```bash
pip install fastapi uvicorn pydantic requests selenium
```

Or for Flask:

```bash
pip install flask flask-cors requests selenium
```

These installation requirements are documented in the repository's backend specification.

---

## 5. Start the Backend

For FastAPI:

```bash
uvicorn app:app --reload --port 5000
```

Or for Flask:

```bash
python app.py
```

The documented backend configuration uses port `5000`.

---

## 🔐 Environment Variables

The AI integration requires an API key.

Example:

```env
GROK_API_KEY=your_api_key_here
```

**Never commit API keys or other secrets to GitHub.**

Use an environment file such as:

```text
.env
```

and make sure it is included in `.gitignore`.

---

## 🔄 Complete Workflow

The intended application workflow is:

### Step 1 — Define the test target

Enter the website URL:

```text
https://your-application.com
```

### Step 2 — Describe the requirement

Provide a user story:

```text
As a customer,
I want to log into my account,
so that I can access my dashboard.
```

### Step 3 — Generate tests

The AI analyzes the requirement and generates structured test cases.

### Step 4 — Review tests

The user can review the generated:

* Test scenarios
* Steps
* Expected results
* Test types

### Step 5 — Execute tests

Selenium launches the browser and executes the selected tests.

### Step 6 — Analyze results

The application displays:

```text
Total Tests
    │
    ├── Passed
    ├── Failed
    └── Pending
```

along with execution details and errors.

---

## 🧠 Test Case Types

The system supports different categories of tests:

| Type        | Description                        |
| ----------- | ---------------------------------- |
| `nominal`   | Normal expected user behavior      |
| `edge_case` | Boundary or unusual scenarios      |
| `error`     | Invalid input or failure scenarios |

These test types are part of the backend's defined test-case model.

---

## 🎯 Project Objectives

The main objectives of AI Test Companion are to:

* Automate test-case generation
* Reduce manual test design effort
* Use Generative AI in software testing
* Automate browser-based testing
* Connect AI-generated test cases with Selenium
* Provide structured test execution results
* Improve the software testing workflow
* Explore the integration of AI with Quality Assurance

---

## 🚀 Future Improvements

Possible improvements include:

* [ ] Support more AI providers
* [ ] Add authentication
* [ ] Add test-case editing before execution
* [ ] Add test history
* [ ] Store test execution results
* [ ] Add screenshots for failed tests
* [ ] Add video recording of test execution
* [ ] Add parallel Selenium execution
* [ ] Add Playwright support
* [ ] Add CI/CD integration
* [ ] Add downloadable test reports
* [ ] Add PDF/HTML test reports
* [ ] Add automatic bug-report generation
* [ ] Add test coverage analytics
* [ ] Add Docker deployment

---

## 📚 Learning Outcomes

This project demonstrates practical experience with:

* **Generative AI**
* **AI-assisted software testing**
* **React**
* **TypeScript**
* **Python**
* **FastAPI / Flask**
* **REST APIs**
* **Selenium**
* **Browser Automation**
* **Test Case Generation**
* **Software Quality Assurance**
* **Frontend/Backend Integration**

---

## 👩‍💻 Author

**Data Engineering & AI Engineering Student**

---

## 🔗 Repository

[AI Test Companion on GitHub](https://github.com/1dhouha/ai-test-companion)

---

⭐ If you find this project interesting, feel free to explore the repository and experiment with AI-assisted automated testing.
