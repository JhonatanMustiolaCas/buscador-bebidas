import { Alert, Button, Col, Form, Row } from "react-bootstrap"
import useCategorias from "../hooks/useCatgorias"
import useBebidas from "../hooks/useBebidas"
import { useState } from "react";

const Formulario = () => {

    const [busqueda, setBusqueda] = useState({
        nombre: "",
        categoria: ""
    });
    const [alerta, setAlerta] = useState("");

    const { categorias } = useCategorias();
    const { consultarBebida } = useBebidas();


    const handleSubmit = e => {
        e.preventDefault();

        if (Object.values(busqueda).includes("")) {
            setAlerta("Todos los campos son obligatorios")
            return
        }

        setAlerta("");
        consultarBebida(busqueda);
    }

    return (
        <Form
            onSubmit={handleSubmit}
        >
            {alerta && <Alert variant="danger" className="text-center">{alerta}</Alert>}
            <Row>
                <Col md={6} >
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="nombre" className="text-white">Nombre Bebida</Form.Label>
                        <Form.Control
                            id="nombre"
                            type="text"
                            placeholder="Ej: Tequila, Vodka, Margarita..."
                            name="nombre"
                            value={busqueda.nombre}
                            onChange={e => setBusqueda({
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                        >
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6} >
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="nombre" className="text-white">Categoría</Form.Label>
                        <Form.Select
                            id="categoria"
                            name="categoria"
                            value={busqueda.categoria}
                            onChange={e => setBusqueda({
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                        >
                            <option>- Selecciona Categoría -</option>
                            {categorias.map((categ, i) => (
                                <option
                                    key={i}
                                    value={categ.strCategory}
                                >
                                    {categ.strCategory}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className=" justify-content-end">
                <Col md={3}>
                    <Button
                        type="submit"
                        variant="danger"
                        className="text-uppercase w-100"
                    >
                        Buscar Bebidas
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Formulario
