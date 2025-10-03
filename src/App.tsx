import { Button } from './components/Button/Button'
import { Heading } from './components/Heading/Heading'
import { Tooltip } from './components/Tooltip/Tooltip'

export function App() {
  function handleOnCLick() {
    console.log('clicou')
  }
  const textoLongo =
    'Um título bem grandinho só para demonstrar o truncamento em múltiplas linhas quando o container tem largura limitada.'

  return (
    <main className="p-6 space-y-6">
      {/* H1 principal da página */}
      <Heading as="h1" size="3xl" color="text-slate-900">
        Main page
      </Heading>
      {/* Subtítulo (exemplo de cor e classe extra) */}
      <Heading as="h2" size="lg" color="text-blue-700" className="tracking-tight">
        Subtítulo da seção
      </Heading>

      {/* Exemplo de truncamento em 2 linhas (repare no max-w para forçar quebra) */}
      <Tooltip content="tooltip for headinng">
        <Heading as="h3" num_of_lines={2} className="max-w-md">
          {textoLongo}
        </Heading>
      </Tooltip>
      <Button size="lg" variant="primary" onClick={handleOnCLick}>
        Button para teste
      </Button>
    </main>
  )
}
