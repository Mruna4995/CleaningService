import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { RequestService, CleaningRequest } from '../../../../services/request.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  requests: CleaningRequest[] = [];
  pendingRequests: CleaningRequest[] = [];  // For pending requests

  constructor(private requestService: RequestService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRequests();  // Load all requests and pending requests when component is initialized
  }

  loadRequests(): void {
    // Fetch all requests
    this.requestService.getAllRequests().subscribe({
      next: (data: CleaningRequest[]) => {
        this.requests = data;
        console.log("Loaded all requests", data);  // Debug log
      },
      error: (err) => {
        console.error('Failed to load all requests', err);
      }
    });

    // Fetch pending requests
    this.requestService.getPendingRequests().subscribe({
      next: (data: CleaningRequest[]) => {
        this.pendingRequests = data;
        console.log("Loaded pending requests", data);  // Debug log
      },
      error: (err) => {
        console.error('Failed to load pending requests', err);
      }
    });
  }

  approve(id: number): void {
    console.log("Approve button clicked for ID:", id);  // Debug log
    this.requestService.updateRequestStatus(id, 'APPROVED').subscribe({
      next: () => {
        alert('✅ Request approved successfully!');
        this.loadRequests();  // Reload the requests list after approval
      },
      error: (err) => {
        console.error('❌ Failed to approve request:', err);
      }
    });
  }

  reject(id: number): void {
    this.requestService.updateRequestStatus(id, 'REJECTED').subscribe({
      next: () => {
        alert('❌ Request rejected successfully.');
        this.loadRequests();  // Reload the requests list after rejection
      },
      error: (err) => {
        console.error('❌ Failed to reject request:', err);
        alert('❌ Failed to reject request');
      }
    });
  }

  staffList = [
    { name: 'Mrunali Kamble', email: 'kamblemrunali9552@gmail.com' },
    { name: 'Sonal Patil', email: 'sonal@example.com' },
    { name: 'Mahesh Kulkarni', email: 'mahesh@example.com' }
  ];

  assignStaff(id: number, staffName: string, staffEmail: string): void {
    // Validate staff name and email are not empty
    if (!staffName.trim() || !staffEmail.trim()) {  // Corrected validation
      alert('Please enter both staff name and email.');
      return;
    }

    // Make the HTTP PUT request to assign staff
    this.http.put(`http://localhost:8082/api/requests/${id}/assign`, { assignedTo: staffName, email: staffEmail })
      .subscribe({
        next: () => {
          alert('Staff assigned successfully!');
          this.loadRequests();  // Reload the requests list after assignment
        },
        error: (err) => {
          console.error('Failed to assign staff:', err);
          alert('Error assigning staff.');
        }
      });
  }
}
