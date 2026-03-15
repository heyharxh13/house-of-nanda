"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const product_entity_1 = require("../products/product.entity");
const category_entity_1 = require("../categories/category.entity");
const collection_entity_1 = require("../collections/collection.entity");
const user_entity_1 = require("../users/user.entity");
const address_entity_1 = require("../addresses/address.entity");
const cart_entity_1 = require("../cart/cart.entity");
const cart_item_entity_1 = require("../cart/cart-item.entity");
const wishlist_entity_1 = require("../wishlist/wishlist.entity");
const order_entity_1 = require("../orders/order.entity");
const order_item_entity_1 = require("../orders/order-item.entity");
const testimonial_entity_1 = require("../testimonials/testimonial.entity");
const faq_entity_1 = require("../faq/faq.entity");
const review_entity_1 = require("../reviews/review.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'mysql',
                    host: config.get('DB_HOST', 'localhost'),
                    port: config.get('DB_PORT', 3306),
                    username: config.get('DB_USERNAME', 'root'),
                    password: config.get('DB_PASSWORD', ''),
                    database: config.get('DB_NAME', 'house_of_nanda'),
                    entities: [
                        product_entity_1.Product,
                        category_entity_1.Category,
                        collection_entity_1.Collection,
                        user_entity_1.User,
                        address_entity_1.Address,
                        cart_entity_1.Cart,
                        cart_item_entity_1.CartItem,
                        wishlist_entity_1.WishlistItem,
                        order_entity_1.Order,
                        order_item_entity_1.OrderItem,
                        testimonial_entity_1.Testimonial,
                        faq_entity_1.Faq,
                        review_entity_1.Review,
                    ],
                    synchronize: config.get('NODE_ENV') !== 'production',
                    logging: config.get('NODE_ENV') === 'development',
                }),
            }),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map