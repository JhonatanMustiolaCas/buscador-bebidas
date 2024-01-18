import { createContext, useEffect } from "react";
import { useState } from "react"
import axios from "axios";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {

    const [bebidas, setBebidas] = useState([]);
    const [modal, setModal] = useState(false);
    const [bebidaId, setBebidaId] = useState(null);
    const [receta, setReceta] = useState({});
    const [cargando, setCargando] = useState(false);
    const [bebidasFav, setBebidasFav] = useState(JSON.parse(localStorage.getItem("favoritos")) ?? {});
    const [modalFav, setModalFav] = useState(false);

    useEffect(() => {
        setCargando(true)
        const obtenerReceta = async () => {
            if (!bebidaId) return

            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;

                const { data } = await axios(url)
                setReceta(data.drinks[0])

            } catch (error) {
                console.log(error)
            } finally {
                setCargando(false)
            }
        }
        obtenerReceta()
    }, [bebidaId])

    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(bebidasFav))
    }, [bebidasFav])

    const consultarBebida = async (datos) => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`

            const { data } = await axios(url);

            setBebidas(data.drinks)

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalClick = () => {
        setModal(!modal);
    }

    const handleBebidaIdClick = id => {
        setBebidaId(id)
    }

    const handleBebidaFavIdClick = bebidaFav => {
        if (Object.keys(bebidasFav).includes(bebidaFav.id)) {
            return
        }

        setBebidasFav({
            ...bebidasFav,
            [bebidaFav.id]: {
                nombre: bebidaFav.nombre,
                imagen: bebidaFav.imagen
            }
        })
    }

    const handleModalFavClick = () => {
        setModalFav(!modalFav);
    }

    const handleEliminarFav = id => {
        const bebidasFavFiltrado = Object.entries(bebidasFav).filter(([key, value]) => key !== id)
        const bebidasFavActualizadas = Object.fromEntries(bebidasFavFiltrado)
        setBebidasFav(bebidasFavActualizadas);
    }

    return (
        <BebidasContext.Provider value={{
            consultarBebida,
            bebidas,
            handleModalClick,
            modal,
            handleBebidaIdClick,
            receta,
            cargando,
            bebidasFav,
            handleBebidaFavIdClick,
            modalFav,
            handleModalFavClick,
            handleEliminarFav
        }}>
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider
}

export default BebidasContext