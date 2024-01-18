import { Button, Image } from 'react-bootstrap'
import estrellaIcono from "../assets/estrella.png";
import useBebidas from '../hooks/useBebidas';

function Menu() {
    const { handleModalFavClick } = useBebidas();
    return (
        <Button
            variant="link"
            type='button'
            onClick={() => handleModalFavClick()}
            className='estrella'
        >
            <Image
                src={estrellaIcono}
                className='w-25'
            />
        </Button>
    )
}

export default Menu
