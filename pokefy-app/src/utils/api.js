// pegar produtos comuns da api
export const fetchCommonProducts = async () => {
    // fazer fetch dos produtos
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        // normaliza dados pro formato
        return data.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            category: item.category, // electronics jewelery mens womens
            image: item.image,
            description: item.description,
            rating: item.rating,
            type: 'common' // marca tipo comum
        }));
    } catch (error) {
        // retorna lista vazia
        console.error("Failed to fetch common products", error);
        return [];
    }
};
