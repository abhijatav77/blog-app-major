import { v2 as cloudinary } from 'cloudinary'
import { Blog } from '../model/blogModel.js';


export const createBlog = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Blog image required"
            })
        }

        const { blogImage } = req.files;
        const allowedFormat = ["image/jpeg", "image/png"]
        if (!allowedFormat.includes(blogImage.mimetype)) {
            return res.status(200).json({
                success: false,
                message: 'Invalid photo format. Only jpg and png image are allowed.'
            })
        }
        const { title, category, about } = req.body
        if (!title || !category || !about) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const adminName = req.user?.name;
        const adminPhoto = req.user?.adminPhoto?.url;
        const createdBy = req.user?._id;

        console.log("middlewareeeeeeeeee", req.user)

        const cloudinaryResponse = await cloudinary.uploader.upload(
            blogImage.tempFilePath
        )

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(401).json({
                success: false,
                message: 'Image upload failed'
            })
        }

        const blogData = await Blog.create({
            title,
            category,
            about,
            blogImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
            admin: {
                name: adminName,
                photo: adminPhoto,
                userId: createdBy
            }
        })

        return res.status(200).json({
            success: true,
            message: 'Blog post successfully',
            blogData

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // 👉 Step 1: Find blog
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // 👉 Step 2: Get body data
    const { title, category, about } = req.body;

    // 👉 Step 3: Keep old image by default
    let imageData = blog.blogImage;

    // 👉 Step 4: Check if new image is provided
    if (req.files && req.files.blogImage) {
      const { blogImage } = req.files;

      const allowedFormat = ["image/jpeg", "image/png"];
      if (!allowedFormat.includes(blogImage.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Only jpg and png allowed",
        });
      }

      // 👉 Step 5: Delete old image from Cloudinary
      if (blog.blogImage?.public_id) {
        await cloudinary.uploader.destroy(blog.blogImage.public_id);
      }

      // 👉 Step 6: Upload new image
      const cloudinaryResponse = await cloudinary.uploader.upload(
        blogImage.tempFilePath
      );

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }

      // 👉 Step 7: Save new image data
      imageData = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    // 👉 Step 8: Update fields
    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.about = about || blog.about;
    blog.blogImage = imageData;

    // 👉 Step 9: Save updated blog
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id)
        if(!blog){
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            blog
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getBlog = async (req, res) => {
    try {
        const blogs = await Blog.find()
        return res.status(200).json({
            success: true,
            blogs
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const singleBlog = async (req, res) => {
    try {
        const {id} = req.params
        const blog = await Blog.findById(id)
        if(!blog){
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }
        return res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

export const specificUserBlogs = async (req, res) => {
    try {
        const userId = req.user._id;

        const blogs = await Blog.find({"admin.userId": userId})

        return res.status(200).json({
            success: true,
            blogs
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}