"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_module_1 = require("./database/database.module");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const collections_module_1 = require("./collections/collections.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const addresses_module_1 = require("./addresses/addresses.module");
const cart_module_1 = require("./cart/cart.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const orders_module_1 = require("./orders/orders.module");
const testimonials_module_1 = require("./testimonials/testimonials.module");
const faq_module_1 = require("./faq/faq.module");
const payments_module_1 = require("./payments/payments.module");
const reviews_module_1 = require("./reviews/reviews.module");
const newsletter_module_1 = require("./newsletter/newsletter.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            database_module_1.DatabaseModule,
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            collections_module_1.CollectionsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            addresses_module_1.AddressesModule,
            cart_module_1.CartModule,
            wishlist_module_1.WishlistModule,
            orders_module_1.OrdersModule,
            testimonials_module_1.TestimonialsModule,
            faq_module_1.FaqModule,
            payments_module_1.PaymentsModule,
            reviews_module_1.ReviewsModule,
            newsletter_module_1.NewsletterModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map