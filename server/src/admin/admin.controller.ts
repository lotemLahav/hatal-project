import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './admin.gaurd';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), AdminGuard) 
export class AdminController {
  
  @Get('dashboard')
  getAdminDashboard() {
    return { message: 'Admin dashboard data' };
  }
}