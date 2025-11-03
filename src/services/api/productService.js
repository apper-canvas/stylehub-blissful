class ProductService {
  constructor() {
    // Initialize ApperClient
    this.initializeClient();
  }

  initializeClient() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "originalPrice_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "reviewCount_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}]
      };

      const response = await this.apperClient.fetchRecords('products_c', params);
      
      if (!response.success) {
        console.error("Failed to fetch products:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching products:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "originalPrice_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "reviewCount_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "tags_c"}}
        ]
      };

      const response = await this.apperClient.getRecordById('products_c', id, params);
      
      if (!response.success || !response.data) {
        throw new Error("Product not found");
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.response?.data?.message || error);
      throw new Error("Product not found");
    }
  }

  async getByCategory(category) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "originalPrice_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "reviewCount_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [{"FieldName": "category_c", "Operator": "EqualTo", "Values": [category]}]
      };

      const response = await this.apperClient.fetchRecords('products_c', params);
      
      if (!response.success) {
        console.error("Failed to fetch products by category:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching products by category:", error?.response?.data?.message || error);
      return [];
    }
  }

  async search(query) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "originalPrice_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "reviewCount_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {"conditions": [{"fieldName": "title_c", "operator": "Contains", "values": [query]}], "operator": "OR"},
            {"conditions": [{"fieldName": "brand_c", "operator": "Contains", "values": [query]}], "operator": "OR"},
            {"conditions": [{"fieldName": "category_c", "operator": "Contains", "values": [query]}], "operator": "OR"},
            {"conditions": [{"fieldName": "subcategory_c", "operator": "Contains", "values": [query]}], "operator": "OR"},
            {"conditions": [{"fieldName": "description_c", "operator": "Contains", "values": [query]}], "operator": "OR"},
            {"conditions": [{"fieldName": "tags_c", "operator": "Contains", "values": [query]}], "operator": "OR"}
          ]
        }]
      };

      const response = await this.apperClient.fetchRecords('products_c', params);
      
      if (!response.success) {
        console.error("Failed to search products:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error searching products:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getFeatured() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "originalPrice_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "reviewCount_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [{"FieldName": "rating_c", "Operator": "GreaterThanOrEqualTo", "Values": ["4.5"]}],
        orderBy: [{"fieldName": "rating_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 8, "offset": 0}
      };

      const response = await this.apperClient.fetchRecords('products_c', params);
      
      if (!response.success) {
        console.error("Failed to fetch featured products:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching featured products:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getSaleItems() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "originalPrice_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "reviewCount_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [{"FieldName": "discount_c", "Operator": "GreaterThan", "Values": ["0"]}]
      };

      const response = await this.apperClient.fetchRecords('products_c', params);
      
      if (!response.success) {
        console.error("Failed to fetch sale items:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching sale items:", error?.response?.data?.message || error);
      return [];
    }
  }

  // Filter methods
  async filterProducts(filters) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const whereConditions = [];
      
      if (filters.category) {
        whereConditions.push({"FieldName": "category_c", "Operator": "EqualTo", "Values": [filters.category]});
      }

      if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        if (min) {
          whereConditions.push({"FieldName": "price_c", "Operator": "GreaterThanOrEqualTo", "Values": [min.toString()]});
        }
        if (max) {
          whereConditions.push({"FieldName": "price_c", "Operator": "LessThanOrEqualTo", "Values": [max.toString()]});
        }
      }

      if (filters.sizes && filters.sizes.length > 0) {
        whereConditions.push({"FieldName": "sizes_c", "Operator": "Contains", "Values": filters.sizes});
      }

      if (filters.colors && filters.colors.length > 0) {
        whereConditions.push({"FieldName": "colors_c", "Operator": "Contains", "Values": filters.colors});
      }

      if (filters.brands && filters.brands.length > 0) {
        whereConditions.push({"FieldName": "brand_c", "Operator": "EqualTo", "Values": filters.brands});
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "originalPrice_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "reviewCount_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "inStock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: whereConditions
      };

      const response = await this.apperClient.fetchRecords('products_c', params);
      
      if (!response.success) {
        console.error("Failed to filter products:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error filtering products:", error?.response?.data?.message || error);
      return [];
    }
  }

  // Get unique filter values
  async getFilterOptions() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}}
        ]
      };

      const response = await this.apperClient.fetchRecords('products_c', params);
      
      if (!response.success) {
        console.error("Failed to fetch filter options:", response.message);
        return {
          categories: [],
          brands: [],
          sizes: [],
          colors: []
        };
      }

      const data = response.data || [];
      
      const categories = [...new Set(data.map(p => p.category_c).filter(Boolean))];
      const brands = [...new Set(data.map(p => p.brand_c).filter(Boolean))];
      const sizes = [...new Set(data.flatMap(p => p.sizes_c ? p.sizes_c.split(',') : []))];
      const colors = [...new Set(data.flatMap(p => p.colors_c ? p.colors_c.split(',') : []))];

      return {
        categories,
        brands,
        sizes,
        colors
      };
    } catch (error) {
      console.error("Error fetching filter options:", error?.response?.data?.message || error);
      return {
        categories: [],
        brands: [],
        sizes: [],
        colors: []
      };
    }
  }
}

export const productService = new ProductService();