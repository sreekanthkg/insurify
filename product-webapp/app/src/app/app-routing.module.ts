import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInsurancePolicyComponent } from './add-insurance-policy/add-insurance-policy.component';
import { PoliciesComponent } from './policies/policies.component';
import { PreviewMarkupComponent } from './preview-markup/preview-markup.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  {path:"",component:RecommendationComponent},
  {path:"register",component:RegisterComponent},
  {path:"add-policy",component:AddInsurancePolicyComponent},
  {path:"policies", component:PoliciesComponent},
  {path:"update", component:UpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
