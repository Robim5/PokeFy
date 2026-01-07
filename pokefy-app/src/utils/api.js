export const fetchCommonProducts = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        return data.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            category: item.category, // electronics, jewelery, men's clothing, women's clothing
            image: item.image,
            description: item.description,
            rating: item.rating,
            type: 'common' // Distinguish from 'pokemon'
        }));
    } catch (error) {
        console.error("Failed to fetch common products", error);
        return [];
    }
};
