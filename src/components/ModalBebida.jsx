import { Image, Modal, Button } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";

export default function ModalBebida() {

    const { modal, handleModalClick, handleBebidaFavIdClick, receta, cargando, bebidasFav } = useBebidas();

    const mostrarIngredientes = () => {
        let ingredientes = []

        for (let i = 1; i <= 15; i++) {
            if (receta[`strIngredient${i}`]) {
                ingredientes.push(
                    <li key={i}>{receta[`strIngredient${i}`]} - {receta[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes
    }

    return (
        !cargando && (
            <Modal show={modal} onHide={handleModalClick}>

                <Image
                    src={receta.strDrinkThumb}
                    alt={`Imagen bebida ${receta.strDrink}`}
                />

                <Modal.Header>
                    <Modal.Title>{receta.strDrink}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="p-3">
                        <h2>Instrucciones</h2>
                        {receta.strInstructions}
                        <h2>Ingredientes y Cantidades</h2>
                        {mostrarIngredientes()}
                    </div>
                    {
                        !Object.keys(bebidasFav).includes(receta.idDrink) ? (
                            <Button
                                className="w-100 mt-3 text-uppercase mt-w"
                                variant="warning"
                                onClick={() => {
                                    handleBebidaFavIdClick({
                                        id: receta.idDrink,
                                        nombre: receta.strDrink,
                                        imagen: receta.strDrinkThumb
                                    })
                                }}
                            >
                                Agregar a Favoritos
                            </Button>
                        ) : (
                            <span className="w-100 p-2 d-block text-center text-bg-warning text-uppercase mt-2">Favorito</span>
                        )
                    }
                </Modal.Body>
            </Modal>
        )
    )
}
