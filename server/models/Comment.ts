import { Document, Schema, Types, ObjectId, model, Model } from 'mongoose'

export interface IComment extends Document {
    commentId: ObjectId,
    commentType: string,
    userId: ObjectId,
    productId: ObjectId,
    text: string,
    imageSrcs: string[],
    createdAt: number
}

interface CommentModel extends Model<IComment> {
    findByProductId(productId: string, offset: number, limit: number): any,
    getCommentsQty(productId: string): any,
    getRepliesComments(productId: string, commentId: string, offset: number, limit: number): any
}

const commentSchema = new Schema<IComment, CommentModel>({
    commentId: {
        type: Schema.Types.ObjectId,
        default: Types.ObjectId
    },
    commentType: {
        type: String,
        enum: ['normal', 'reply'],
        default: 'normal'
    },
    userId: Schema.Types.ObjectId,
    productId: Schema.Types.ObjectId,
    text: String,
    imageSrcs: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Number,
        default: Date.now()
    }
})

commentSchema.statics = {
    findByProductId: function(
        productId: string,
        offset: number,
        limit: number
    ) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        { $eq: [{ $toString: '$productId' }, productId] },
                        { $eq: ['$commentType', 'normal'] }
                    ]
                }
            })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .sort({ createdAt: 1 })
            .lookup({
                from: 'users',
                let: { userId: '$userId' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$_id', '$$userId']
                            }
                        }
                    }
                ],
                as: 'users'
            })
            .project({
                commentType: 1,
                productId: 1,
                text: 1,
                imageSrcs: 1,
                createdAt: 1,
                sender: { $first: '$users' }
            })
            .project({
                commentType: 1,
                productId: 1,
                text: 1,
                imageSrcs: 1,
                createdAt: 1,
                sender: {
                    _id: '$sender._id',
                    avatarSrc: '$sender.avatarSrc',
                    username: '$sender.username'
                }
            })
            .then(docs => ({ comments: docs }))
    },
    getCommentsQty: function(productId: string) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        { $eq: [{ $toString: '$productId' }, productId] },
                        { $eq: ['$commentType', 'normal'] }
                    ]
                }
            })
            .count('qty')
            .then(docs => ({ commentsQty: docs.length > 0 ? docs[0].qty || 0 : 0 }))
    },
    getRepliedComments: function(
        productId: string, 
        commentId: string,
        offset: number,
        limit: number
    ) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        { $eq: [{ $toString: '$productId' }, productId] },
                        { $eq: [{ $toString: '$comment._id' }, commentId] },
                        { $eq: ['$commentType', 'reply'] }
                    ]
                }
            })
    }
}

const Comment = model<IComment, CommentModel>('comments', commentSchema)

export default Comment