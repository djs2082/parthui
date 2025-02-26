import { PrimaryButton, SecondaryButton } from "parthui";

function App() {
  return (
    <div>
      <h1>Testing ParthUI Components</h1>
      <div style={{ padding: "20px" }}>
        <PrimaryButton onClick={() => {}}>Primary Button</PrimaryButton>
        <SecondaryButton onClick={() => {}}>Secondary Button</SecondaryButton>
      </div>
    </div>
  );
}

export default App;
