import { Breadcrumb } from 'react-bootstrap';
  
  export default function BreadCrumbCustom() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/clinics">Clinic Management</Breadcrumb.Item>
        <Breadcrumb.Item active href="/clinics/:clinicId">Clinic Information</Breadcrumb.Item>
      </Breadcrumb>
    );
  }