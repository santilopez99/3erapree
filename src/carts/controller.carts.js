import { Router } from "express";
import { getCarts, getCartById, addCart, addProductToCart, updateProductsfromCart, updateQuantity, deleteProductfromCart, deleteProductsfromCart, purchase } from "./service.carts.js";
import handlePolicies from "../middlewares/handlePolicies.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const response = await getCarts();
        res.json({status: 'success', message: response.message, payload: response.payload? response.payload : []});
    } catch (error) {
        req.logger.error(error);
        res.status(500).json({status: 'error', error: error.message});
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const response = await getCartById(cid);
        res.json({status: 'success', message: response.message, payload: response.payload? response.payload : {}});
    } catch (error) {
        req.logger.error(error);
        res.status(500).json({status: 'error', error: error.message});
    }
});

router.get('/:cid/purchase', handlePolicies('USER'), async (req, res) => {
    const { cid } = req.params;
    const user = req.user.user;

    try {
        const response = await purchase(cid, user);
        res.json({status: response.status? response.status :'success', message: response.message, payload: response.payload? response.payload : {}});
    } catch(error) {
        req.logger.error(error);
        res.status(500).json({status: 'error', error: error.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const response = await addCart();
        res.status(201).json({status: 'success', message: response.message, payload: response.payload});
    } catch (error) {
        req.logger.error(error);
        res.status(500).json({status: 'error', error: error.message});
    }
});

router.post('/:cid/product/:pid', handlePolicies('USER'), async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const response = await addProductToCart(cid, pid);
        res.json({status: response.status? response.status : 'success', message: response.message});
    } catch (error) {
        req.logger.error(error);
        res.status(500).json({message: 'Error al agregar el producto al carrito', error: error.message});
    }
});

router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const response = await updateProductsfromCart(cid, products);
        res.json({message: response});
    } catch (error) {
        req.logger.error(error);
        res.status(500).json({message: 'Error al actualizar los productos', error: error.message});
    }
});

router.put('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const response = await updateQuantity(cid, pid, quantity);
        res.json({message: response});
    } catch (error) {
        req.logger.error(error);
        res.status(500).json({message: 'Error al actualizar el producto', error: error.message});
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    
    try {
        const response = await deleteProductfromCart(cid, pid);
        res.json({message: response});
    } catch (error) {
        req.logger.error(error);
        res.status(500).json({message: 'Error al eliminar el producto del carrito', error: error.message});
    }
});

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    try{
        const response = await deleteProductsfromCart(cid);
        res.json({message: response});
    } catch(error) {
        req.logger.error(error);
        res.status(500).json({message: 'Error al eliminar los productos del carrito', error: error.message});
    }
});

export default router;