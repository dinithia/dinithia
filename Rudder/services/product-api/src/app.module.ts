import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuditModule } from "./modules/audit";
import { CustomersModule } from "./modules/customers";
import { NotificationsModule } from "./modules/notifications";
import { TenantsModule } from "./modules/tenants";
import { UsersModule } from "./modules/users";
import { WorkflowsModule } from "./modules/workflows";

@Module({
  imports: [
    TenantsModule,
    CustomersModule,
    WorkflowsModule,
    UsersModule,
    NotificationsModule,
    AuditModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
