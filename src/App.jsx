import { Container, Navbar, Nav } from "react-bootstrap"
import Formulario from "./components/Formulario"
import { CategoriasProvider } from "./context/CategoriasProvider"
import { BebidasProvider } from "./context/BebidasProvider"
import { ListadoBebidas } from "./components/ListadoBebidas"
import ModalBebida from "./components/ModalBebida"
import Menu from "./components/Menu"
import ModalFavorito from "./components/ModalFavorito"



function App() {

  return (
    <>
      <CategoriasProvider>
        <BebidasProvider>
          <header className="py-1 position-fixed w-100 top-0 z-3">
            <Navbar expand="lg" className="">
              <Container className="d-flex justify-content-md-between justify-content-center align-items-center">
                <Navbar.Brand href="#home">
                  <h1 className="text-white">Buscador de Bebidas</h1>
                </Navbar.Brand>
                <Nav className="">
                  <Menu />
                </Nav>
              </Container>
            </Navbar>
          </header>

          <Container
            className="m-contenedor"
          >
            <Formulario />
            <ListadoBebidas />
            <ModalBebida />
            <ModalFavorito />
          </Container>
        </BebidasProvider>
      </CategoriasProvider>
    </>
  )
}

export default App
