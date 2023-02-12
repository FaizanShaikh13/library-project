const accessRole = ( perm )=>{
    return (req,res,next)=>{
        if (req.user.role === perm) {
            return next()
        } else {
            res.json({msg:'You do not have the permission'}).status(403)
        }
    }
}


module.exports = accessRole

