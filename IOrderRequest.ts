export interface IOrderRequest {
    Webdomain: string,
    AcceptedTC: boolean,
    Product: {
        OrderedOptions: {
            HostingPremium: boolean,
            HostingStandard: boolean,
            HostingBasic: boolean,
            Maintenance12: boolean,
            Maintenance6: boolean,
            Maintenance3: boolean,
            SslCertificate: boolean,
            NumberOfEmailAddresses2: boolean,
            NumberOfEmailAddresses5: boolean,
            NumberOfEmailAddresses10: boolean,
        },
        OrderedTemplate: {
            TemplateId: string,
            Title: string,
            Description: string,
        }
    }
}