FORM__COMPANY__CREATE__PRODUCT: FormGroup;

NewProduct: Base__Product = {
    id: '',
    name: '',
    price_Normal: 0,
    price_Sale: 0,
    imageURL: '',
    companyId: '',
    keyword: ''
  };

  this.FORM__COMPANY__CREATE__PRODUCT = this.formBuilder.group({
    name: ['',],
    price_Normal: [0.00,],
    price_Sale: [0.00,],
    imageURL: ['',],
    companyId: ['',],
    keyword: ['',]    
  });
  