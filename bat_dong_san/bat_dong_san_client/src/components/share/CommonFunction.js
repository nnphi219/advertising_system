export function ListPostContentToListProduct(postContents) {
    if(!postContents) {
        return [];
    }
    let products = [];

    postContents.forEach(post => {
        let product = {
            id: post._id,
            title: post.tieu_de,
            subTitle: post.tieu_de,
            src_img: post.imageUrl,
            price: '$1000'
        };

        products.push(product);
    });

    return products;
}