const PROD_DATA = [
  {
    applicant: 'Anshu',
    type: 'Offsite (Email)',
    source: 'Careersite',
    'api_key': '78qknit1pu1a16',
    'data-integration-context': 'urn:li:organization:12596288',
    'data-applicant-email': 'anshu.basia@gmail.com',
    'data-ats-job-posting-id': 'apply-connect-explicit-skill4',
    'data-li-job-application-id': 'urn:li:jobApplication:7650139724'
  },
  {
    applicant: 'Anshu',
    type: 'Offsite (LinkedIn Profile URL)',
    source: 'Careersite',
    'api_key': '78qknit1pu1a16',
    'data-integration-context': 'urn:li:organization:12596288',
    'data-li-applicant-profile-url': 'https://www.linkedin.com/in/anshu-basia/',
    'data-ats-job-posting-id': 'apply-connect-explicit-skill4',
    'data-li-job-application-id': 'urn:li:jobApplication:7650139724'
  },
  {
    applicant: 'Sameer',
    type: 'Onsite',
    source: '',
    'api_key': '78qknit1pu1a16',
    'data-integration-context': 'urn:li:organization:12596288',
    'data-li-job-application-id': 'urn:li:jobApplication:7063035694'
  },
  {
    applicant: 'Anshu',
    type: 'Search & Staffing',
    source: '',
    'api_key': '77ntyskl5m1gpp',
    'data-integration-context': 'urn:li:organization:69517847',
    'data-li-job-application-id': 'urn:li:jobApplication:6034201766'
  },
  {
    applicant: 'Justin',
    type: 'Onsite',
    source: '',
    'api_key': '78qknit1pu1a16',
    'data-integration-context': 'urn:li:organization:12596288',
    'data-li-job-application-id': 'urn:li:jobApplication:6592048244'
  },
  {
    applicant: 'Anshu',
    type: 'Onsite RSC+AC',
    source: '',
    'api_key': '86ubil64w7o0o5',
    'data-integration-context': 'urn:li:organization:15180688',
    'data-li-job-application-id': 'urn:li:jobApplication:8184072824',
    'data-ats-candidate-id':'C38284'
  },
  {
    applicant: 'Brian',
    type: 'Mismatch RSC+AC',
    source: '',
    'api_key': '86ubil64w7o0o5',
    'data-integration-context': 'urn:li:organization:15180688',
    'data-li-job-application-id': 'urn:li:jobApplication:7143696696',
    'data-ats-candidate-id':'C38284'
  }
];

const EI_DATA = [
  {
    applicant: 'Steven',
    type: 'Onsite',
    source: '',
    'api_key': '956165lql90p3w',
    'data-integration-context': 'urn:li:organization:1000',
    'data-li-job-application-id': 'urn:li:jobApplication:2147539465'
  }
];

const OPTIONAL_PARAMS = [
  'data-li-job-application-id',
  'data-ats-job-posting-id',
  'data-applicant-email',
  'data-li-applicant-profile-url',
  'data-ats-candidate-id'
];

const WIDGET_TYPE = Object.freeze({
  FULL_PROFILE: 'full-profile',
  HOVER_OVER: 'hover-over'
});

let currentFabric = '';

function loadApplicants(fabric) {
  document.querySelector('tbody').innerHTML = '';

  let applicants;

  if (fabric === 'prod' || fabric === 'local') {
    applicants = PROD_DATA;
  } else if (fabric === 'ei') {
    applicants = EI_DATA;
  }

  applicants.forEach((applicant) => {
    let applicantRowElem = document.createElement('tr');
    applicantRowElem.classList.add('applicant-row');
    applicantRowElem.setAttribute('api_key', applicant['api_key']);
    applicantRowElem.setAttribute('data-integration-context', applicant['data-integration-context']);

    OPTIONAL_PARAMS.forEach((param) => {
      if (applicant[param]) {
        applicantRowElem.setAttribute(param, applicant[param]);
      }
    });

    document.querySelector('tbody').appendChild(applicantRowElem);

    let applicantNameElem = document.createElement('td');
    applicantNameElem.innerText = applicant.applicant;

    let typeElem = document.createElement('td');
    typeElem.innerText = applicant.type;

    let sourceElem = document.createElement('td');
    sourceElem.innerText = applicant.source;

    applicantRowElem.appendChild(applicantNameElem);
    applicantRowElem.appendChild(typeElem);
    applicantRowElem.appendChild(sourceElem);

    applicantRowElem.addEventListener('click', (e) => renderWidgetWithPresetValues(e));
  });
}

function clearFieldsAndWidget() {
  document.querySelector('#api_key').value = '';
  document.querySelector('#data-integration-context').value = '';
  document.querySelector('#data-li-job-application-id').value = '';
  document.querySelector('#data-ats-job-posting-id').value = '';
  document.querySelector('#data-applicant-email').value = '';
  document.querySelector('#data-li-applicant-profile-url').value = '';
  document.querySelector('#data-ats-candidate-id').value = '';
  document.querySelector('#widget-container').innerHTML = '';
}

function switchFabric(e) {
  document.querySelector('.menu .item.active').classList.remove('active');
  e.currentTarget.classList.add('active');

  clearFieldsAndWidget();

  const fabric = e.currentTarget.getAttribute('data-fabric');
  currentFabric = fabric;

  loadApplicants(fabric);
}

function getDomain() {
  if (currentFabric === 'ei') {
    return 'www.linkedin-ei.com';
  } else if (currentFabric === 'local') {
    return 'pemberly.www.linkedin.com:4443';
  }

  return 'www.linkedin.com';
}

function renderWidgetWithPresetValues(e) {
  if (document.querySelector('.positive')) {
    document.querySelector('.positive').classList.remove('positive');
  }
  e.currentTarget.classList.add('positive');

  document.querySelector('#api_key').value = e.currentTarget.getAttribute('api_key');
  document.querySelector('#data-integration-context').value = e.currentTarget.getAttribute('data-integration-context');
  document.querySelector('#data-li-job-application-id').value = e.currentTarget.getAttribute('data-li-job-application-id');
  document.querySelector('#data-ats-job-posting-id').value = e.currentTarget.getAttribute('data-ats-job-posting-id');
  document.querySelector('#data-applicant-email').value = e.currentTarget.getAttribute('data-applicant-email');
  document.querySelector('#data-li-applicant-profile-url').value = e.currentTarget.getAttribute('data-li-applicant-profile-url');
  document.querySelector('#data-ats-candidate-id').value = e.currentTarget.getAttribute('data-ats-candidate-id');

  let params = {};
  params['api_key'] = e.currentTarget.getAttribute('api_key');
  params['data-integration-context'] = e.currentTarget.getAttribute('data-integration-context');
  params['data-li-job-application-id'] = e.currentTarget.getAttribute('data-li-job-application-id');
  params['data-ats-job-posting-id'] = e.currentTarget.getAttribute('data-ats-job-posting-id');
  params['data-applicant-email'] = e.currentTarget.getAttribute('data-applicant-email');
  params['data-li-applicant-profile-url'] = e.currentTarget.getAttribute('data-li-applicant-profile-url');
  params['data-ats-candidate-id'] = e.currentTarget.getAttribute('data-ats-candidate-id');

  renderWidget(params);
}

function renderWidgetWithCustomValues(e) {
  e.preventDefault();

  if (document.querySelector('.positive')) {
    document.querySelector('.positive').classList.remove('positive');
  }

  let params = {};
  params['api_key'] = document.querySelector('#api_key').value;
  params['data-integration-context'] = document.querySelector('#data-integration-context').value;
  params['data-li-job-application-id'] = document.querySelector('#data-li-job-application-id').value;
  params['data-ats-job-posting-id'] = document.querySelector('#data-ats-job-posting-id').value;
  params['data-applicant-email'] = document.querySelector('#data-applicant-email').value;
  params['data-li-applicant-profile-url'] = document.querySelector('#data-li-applicant-profile-url').value;
  params['data-ats-candidate-id'] = document.querySelector('#data-ats-candidate-id').value;

  renderWidget(params);
}

function renderFullProfileWidget(params) {
  let widgetContainerElem = document.querySelector('#widget-container');

  let xdoorElem = document.createElement('script');
  xdoorElem.type = 'text/javascript';
  xdoorElem.src = 'https://platform.linkedin.com/xdoor/scripts/in.js';
  xdoorElem.innerHTML = `api_key:${params['api_key']}
    extensions:HcmWidget@https://${getDomain()}/talent/widgets/assets/javascripts/profile-widget.js`;

  let widgetElem = document.createElement('script');
  widgetElem.type = 'IN/HcmWidget';
  widgetElem.setAttribute('data-widget-type', 'ATS');
  widgetElem.setAttribute('data-integration-context', params['data-integration-context']);
  widgetElem.setAttribute('data-width', '850');
  widgetElem.setAttribute('data-show-unlink-url', 'true');
  widgetElem.setAttribute('data-confirm-unlink', 'true');
  widgetElem.setAttribute('data-onlink', 'link');
  widgetElem.setAttribute('data-onunlink', 'unlink');

  // process optional params
  OPTIONAL_PARAMS.forEach((param) => {
    if (params[param]) {
      widgetElem.setAttribute(param, params[param]);
    }
  });

  widgetContainerElem.append(xdoorElem);
  widgetContainerElem.append(widgetElem);
}

function renderHoverOverWidget(params) {
  let widgetContainerElem = document.querySelector('#widget-container');

  let xdoorElem = document.createElement('script');
  xdoorElem.src = 'https://platform.linkedin.com/in.js';
  xdoorElem.innerHTML = `api_key:${params['api_key']}
    extensions:APPLICANT_HIGHLIGHTS@https://${getDomain()}/talentwidgets/extensions/applicant-highlights-widget`;

  let widgetElem = document.createElement('script');
  widgetElem.type = 'IN/ApplicantHighlights';
  widgetElem.setAttribute('data-integration-context', params['data-integration-context']);

  // process optional params
  OPTIONAL_PARAMS.forEach((param) => {
    if (params[param]) {
      widgetElem.setAttribute(param, params[param]);
    }
  });

  widgetContainerElem.append(xdoorElem);
  widgetContainerElem.append(widgetElem);
}

function renderWidget(params) {
  let widgetContainerElem = document.querySelector('#widget-container');
  widgetContainerElem.innerHTML = '';

  let widgetType = document.querySelector('.checkbox.checked').getAttribute('data-widget-type');

  if (widgetType === WIDGET_TYPE.FULL_PROFILE) {
    renderFullProfileWidget(params);
  } else if (widgetType === WIDGET_TYPE.HOVER_OVER) {
    renderHoverOverWidget(params);
  }
}

function init() {
  loadApplicants('prod');

  document.querySelectorAll('.menu .item').forEach((element) => {
    element.addEventListener('click', (e) => switchFabric(e));
  });

  document.querySelector('#update-btn').addEventListener('click', (e) => renderWidgetWithCustomValues(e));

  $('.ui.radio.checkbox').checkbox();
}

window.addEventListener('load', init);
