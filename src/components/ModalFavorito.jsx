import { Button, ButtonGroup, Image, Modal } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";

export default function ModalFavorito() {

    const { modalFav, handleModalFavClick, bebidasFav, handleBebidaIdClick, handleModalClick, handleEliminarFav } = useBebidas();


    return (
        <Modal show={modalFav} onHide={handleModalFavClick}>

            <Modal.Header>
                <Modal.Title>Bebidas Favoritas</Modal.Title>
            </Modal.Header>

            <Modal.Body className=" justify-content-center flex-column d-flex gap-3">
                {(Object.keys(bebidasFav).length > 0) ? (
                    Object.entries(bebidasFav).map(([key, value]) => (
                        <div key={key} >
                            <div className="d-flex justify-content-between align-items-center">
                                <Image
                                    src={value.imagen}
                                    alt={`Imagen bebida ${value.nombre}`}
                                    className="w-25"
                                />
                                <h5>{value.nombre}</h5>
                                <ButtonGroup className="d-flex flex-column gap-3">
                                    <Button
                                        variant="warning"
                                        className=" text-uppercase rounded-3"
                                        onClick={() => handleEliminarFav(key)}
                                    >
                                        Desmarcar
                                    </Button>
                                    <Button
                                        variant="warning"
                                        className="text-uppercase rounded-3"
                                        onClick={() => {
                                            handleModalFavClick()
                                            handleBebidaIdClick(key)
                                            handleModalClick()
                                        }}
                                    >
                                        Ver Receta
                                    </Button>
                                </ButtonGroup>
                            </div>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>Sin favoritos todavía</p>
                )}
            </Modal.Body>
        </Modal>
    )
}
