export interface Post {
    title:string,
    permalink:string,
    subtitle:string,
    
        categoryId: string,
        categoryName:string,
    
    imgPath:string,
    authorName:string,
    authorRole:string,
    content:string,
    isFeatured:boolean,
    views:number,
    createdAt:Date,
    status:string
}
