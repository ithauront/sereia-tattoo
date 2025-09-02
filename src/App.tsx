import { Button } from './components/Button/Button'

export function App() {
  function handleOnCLick() {
    console.log('clicou')
  }
  return (
    <>
      <h1>Main page</h1>
      <Button size="lg" variant="primary" onClick={handleOnCLick}>
        Button para teste
      </Button>
    </>
  )
}
