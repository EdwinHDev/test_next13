import { ReactNode } from "react"
import { Nav } from "./Nav"

interface Props {
  children: ReactNode | ReactNode[]
}

export const DefaultLayout = ({ children }: Props) => {
  return (
    <div>
      <header>
          <Nav />
      </header>
      {children}
    </div>
  )
}