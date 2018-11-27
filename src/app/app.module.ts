import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from 'ng-fullcalendar';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import {WebcamModule} from 'ngx-webcam';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { FilterPipe } from './pipes/filter.pipe';
import { HomeComponent } from './admin/home/home.component';
import { ChangepassComponent } from './admin/changepass/changepass.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegisterComponent } from './admin/register/register.component';
import { WingsComponent } from './admin/wings/wings.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { LogoComponent } from './admin/logo/logo.component';
import { CarouselComponent } from './admin/carousel/carousel.component';
import { ErrdictComponent } from './admin/errdict/errdict.component';
import { EmailserverComponent } from './admin/emailserver/emailserver.component';
import { EmailserverformComponent } from './admin/emailserverform/emailserverform.component';
import { EmailtemplateComponent } from './admin/emailtemplate/emailtemplate.component';
import { SmscComponent } from './admin/smsc/smsc.component';
import { SmstemplateComponent } from './admin/smstemplate/smstemplate.component';
import { NotichannelsComponent } from './admin/notichannels/notichannels.component';
import { PaymentgatewayComponent } from './admin/paymentgateway/paymentgateway.component';
import { PaymentgatewayformComponent } from './admin/paymentgatewayform/paymentgatewayform.component';
import { PaymethodsComponent } from './admin/paymethods/paymethods.component';
import { BanksComponent } from './admin/banks/banks.component';
import { SellertypeComponent } from './admin/sellertype/sellertype.component';
import { SellersubtypeComponent } from './admin/sellersubtype/sellersubtype.component';
import { SellercatsComponent } from './admin/sellercats/sellercats.component';
import { SellerservtypesComponent } from './admin/sellerservtypes/sellerservtypes.component';
import { TickettypesComponent } from './crm/tickettypes/tickettypes.component';
import { TicketsubtypeComponent } from './crm/ticketsubtype/ticketsubtype.component';
import { TicketcatComponent } from './crm/ticketcat/ticketcat.component';
import { EscmatrixComponent } from './crm/escmatrix/escmatrix.component';
import { CrmactioncodesComponent } from './crm/crmactioncodes/crmactioncodes.component';
import { TatsComponent } from './crm/tats/tats.component';
import { SyslogsComponent } from './admin/syslogs/syslogs.component';
import { BussentityComponent } from './admin/bussentity/bussentity.component';
import { UseraccComponent } from './admin/useracc/useracc.component';
import { AccessprofilesComponent } from './admin/accessprofiles/accessprofiles.component';
import { AccesscontrolsComponent } from './admin/accesscontrols/accesscontrols.component';
import { FlattypeComponent } from './admin/flattype/flattype.component';
import { MemprofileComponent } from './crm/memprofile/memprofile.component';
import { MemprofilelistComponent } from './crm/memprofilelist/memprofilelist.component';
import { CommtypeComponent } from './admin/commtype/commtype.component';
import { VisitorsComponent } from './support/visitors/visitors.component';
import { VisitormasterlistComponent } from './support/visitormasterlist/visitormasterlist.component';
import { IncidentvisitComponent } from './support/incidentvisit/incidentvisit.component';
import { InvitesComponent } from './support/invites/invites.component';
import { InviteformComponent } from './support/inviteform/inviteform.component';
import { VisitorlogComponent } from './support/visitorlog/visitorlog.component';
import { PendingvisitorreqComponent } from './support/pendingvisitorreq/pendingvisitorreq.component';
import { BookingsComponent } from './support/bookings/bookings.component';
import { SrmgmtComponent } from './support/srmgmt/srmgmt.component';
import { SrnewComponent } from './support/srnew/srnew.component';
import { SropenComponent } from './support/sropen/sropen.component';
import { SrcloseComponent } from './support/srclose/srclose.component';
import { SrpublicComponent } from './support/srpublic/srpublic.component';
import { MyaccComponent } from './fin/myacc/myacc.component';
import { VisitormenuComponent } from './support/visitormenu/visitormenu.component';
import { BlockvisitorComponent } from './support/blockvisitor/blockvisitor.component';
import { VisitorparkbookComponent } from './support/visitorparkbook/visitorparkbook.component';
import { VehicleregComponent } from './crm/vehiclereg/vehiclereg.component';
import { MaintchargeComponent } from './fin/maintcharge/maintcharge.component';
import { AccmenuComponent } from './fin/accmenu/accmenu.component';
import { AccountsComponent } from './fin/accounts/accounts.component';
import { MaintchargelistComponent } from './fin/maintchargelist/maintchargelist.component';
import { PayhistoryComponent } from './fin/payhistory/payhistory.component';
import { MyaccmenuComponent } from './fin/myaccmenu/myaccmenu.component';
import { MakepaymentComponent } from './fin/makepayment/makepayment.component';
import { MeminvoicesComponent } from './fin/meminvoices/meminvoices.component';
import { EventsncalsComponent } from './support/eventsncals/eventsncals.component';
import { SecmenuComponent } from './support/secmenu/secmenu.component';
import { SecurityComponent } from './support/security/security.component';
import { GatepassComponent } from './support/gatepass/gatepass.component';
import { VisitorpendingreqComponent } from './support/visitorpendingreq/visitorpendingreq.component';
import { TenantshiftaccessComponent } from './support/tenantshiftaccess/tenantshiftaccess.component';
import { SrprogressComponent } from './crm/srprogress/srprogress.component';
import { SrgrevComponent } from './crm/srgrev/srgrev.component';
import { SrmenuComponent } from './crm/srmenu/srmenu.component';
import { ByelawsComponent } from './reports/byelaws/byelaws.component';
import { WatermenuComponent } from './ops/watermenu/watermenu.component';
import { WatermgmtComponent } from './ops/watermgmt/watermgmt.component';
import { WatersourcesComponent } from './ops/watersources/watersources.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    HomeComponent,
    ChangepassComponent,
    DashboardComponent,
    RegisterComponent,
    WingsComponent,
    SettingsComponent,
    LogoComponent,
    CarouselComponent,
    ErrdictComponent,
    EmailserverComponent,
    EmailserverformComponent,
    EmailtemplateComponent,
    SmscComponent,
    SmstemplateComponent,
    NotichannelsComponent,
    PaymentgatewayComponent,
    PaymentgatewayformComponent,
    PaymethodsComponent,
    BanksComponent,
    SellertypeComponent,
    SellersubtypeComponent,
    SellercatsComponent,
    SellerservtypesComponent,
    TickettypesComponent,
    TicketsubtypeComponent,
    TicketcatComponent,
    EscmatrixComponent,
    CrmactioncodesComponent,
    TatsComponent,
    SyslogsComponent,
    BussentityComponent,
    UseraccComponent,
    AccessprofilesComponent,
    AccesscontrolsComponent,
    FlattypeComponent,
    MemprofileComponent,
    MemprofilelistComponent,
    CommtypeComponent,
    VisitorsComponent,
    VisitormasterlistComponent,
    IncidentvisitComponent,
    InvitesComponent,
    InviteformComponent,
    VisitorlogComponent,
    PendingvisitorreqComponent,
    BookingsComponent,
    SrmgmtComponent,
    SrnewComponent,
    SropenComponent,
    SrcloseComponent,
    SrpublicComponent,
    MyaccComponent,
    VisitormenuComponent,
    BlockvisitorComponent,
    VisitorparkbookComponent,
    VehicleregComponent,
    MaintchargeComponent,
    AccmenuComponent,
    AccountsComponent,
    MaintchargelistComponent,
    PayhistoryComponent,
    MyaccmenuComponent,
    MakepaymentComponent,
    MeminvoicesComponent,
    EventsncalsComponent,
    SecmenuComponent,
    SecurityComponent,
    GatepassComponent,
    VisitorpendingreqComponent,
    TenantshiftaccessComponent,
    SrprogressComponent,
    SrgrevComponent,
    SrmenuComponent,
    ByelawsComponent,
    WatermenuComponent,
    WatermgmtComponent,
    WatersourcesComponent
  ],
  imports: [
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    QRCodeModule,
    NgxBarcodeModule,
    WebcamModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
