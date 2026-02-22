let interviewList = [];
let rejectedList = [];

let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allJobsCard = document.getElementById('all-available-jobs');
const mainContainer = document.querySelector('main');
const filteredJobList = document.getElementById('filtered-job-list');

function calculateCount() {
    totalCount.innerText = allJobsCard.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();

const btnAllFilter = document.getElementById('btn-all-filter');
const btnInterviewFilter = document.getElementById('btn-interview-filter');
const btnRejectedFilter = document.getElementById('btn-rejected-filter');

function toggleBtnStyle(id) {
    btnAllFilter.classList.remove('bg-blue-500', 'text-white');
    btnInterviewFilter.classList.remove('bg-blue-500', 'text-white');
    btnRejectedFilter.classList.remove('bg-blue-500', 'text-white');

    btnAllFilter.classList.add('bg-gray-200', 'text-gray-800');
    btnInterviewFilter.classList.add('bg-gray-200', 'text-gray-800');
    btnRejectedFilter.classList.add('bg-gray-200', 'text-gray-800');

    const clicked = document.getElementById(id);
    clicked.classList.remove('bg-gray-200', 'text-gray-800');
    clicked.classList.add('bg-blue-500', 'text-white');

    if (id == 'btn-interview-filter') {
        allJobsCard.classList.add('hidden');
        filteredJobList.classList.remove('hidden');
        renderInterview();
    } else if (id == 'btn-rejected-filter') {
        allJobsCard.classList.add('hidden');
        filteredJobList.classList.remove('hidden');
        renderRejected();
    } else if (id == 'btn-all-filter') {
        allJobsCard.classList.remove('hidden');
        filteredJobList.classList.add('hidden');
    }
}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-interview')) {
        const parentNode = event.target.parentNode.parentNode;
        const jobProvider = parentNode.querySelector('.job-provider').innerText;
        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const locationTypeSalary = parentNode.querySelector('.location-type-salary').innerText;
        const jobStatus = parentNode.querySelector('.job-status').innerText;
        const jobDetails = parentNode.querySelector('.job-details').innerText;

        const cardInfo = {
            jobProvider,
            jobTitle,
            locationTypeSalary,
            jobStatus,
            jobDetails
        };

        rejectedList = rejectedList.filter(item => item.jobProvider !== cardInfo.jobProvider);

        const foundInInterview = interviewList.find(item => item.jobProvider === cardInfo.jobProvider);
        if (!foundInInterview) {
            interviewList.push(cardInfo);
        }

        parentNode.querySelector('.job-status').innerHTML = `<p class="bg-green-100 text-[#10B981] font-medium py-2 px-4 w-35 rounded-sm">INTERVIEW</p>`;

        calculateCount();

        if (btnInterviewFilter.classList.contains('bg-blue-500')) {
            renderInterview();
        }
    }

    if (event.target.classList.contains('btn-rejected')) {
        const parentNode = event.target.parentNode.parentNode;
        const jobProvider = parentNode.querySelector('.job-provider').innerText;
        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const locationTypeSalary = parentNode.querySelector('.location-type-salary').innerText;
        const jobStatus = parentNode.querySelector('.job-status').innerText;
        const jobDetails = parentNode.querySelector('.job-details').innerText;

        const cardInfo = {
            jobProvider,
            jobTitle,
            locationTypeSalary,
            jobStatus,
            jobDetails
        };

        interviewList = interviewList.filter(item => item.jobProvider !== cardInfo.jobProvider);

        const foundInRejected = rejectedList.find(item => item.jobProvider === cardInfo.jobProvider);
        if (!foundInRejected) {
            rejectedList.push(cardInfo);
        }

        parentNode.querySelector('.job-status').innerHTML = `<p class="bg-red-100 text-[#EF4444] font-medium py-2 px-4 w-35 rounded-sm">REJECTED</p>`;

        calculateCount();

        if (btnRejectedFilter.classList.contains('bg-blue-500')) {
            renderRejected();
        }
    }
});

function renderInterview() {
    filteredJobList.innerHTML = '';
    if (interviewList.length === 0) {
        filteredJobList.innerHTML = '<p class="text-center text-gray-500 py-8">No interview jobs yet</p>';
        return;
    }

    for (let interview of interviewList) {
        let div = document.createElement('div');
        div.className = 'flex justify-between p-4 border border-blue-200 bg-gray-50 rounded-sm';
        div.innerHTML = `
        <div class="space-y-2">
            <h2 class="job-provider text-[18px] font-semibold">${interview.jobProvider}</h2>
            <p class="job-title text-[#64748B]">${interview.jobTitle}</p>
            <br>
            <p class="location-type-salary text-[#64748B]">${interview.locationTypeSalary}</p>
            <br>
            <p class="bg-green-100 text-[#10B981] font-medium py-2 px-4 w-35 rounded-sm">INTERVIEW</p>
            <p class="job-details">${interview.jobDetails}</p>
            <div class="flex gap-4">
                <button class="btn-interview py-2 px-4 w-30 rounded-sm font-bold text-[#10B981] border-2 border-[#10B981]">INTERVIEW</button>
                <button class="btn-rejected py-2 px-4 w-30 rounded-sm font-bold text-[#EF4444] border-2 border-[#EF4444]">REJECTED</button>
            </div>
        </div>
        <div>
            <button class="bg-white p-1 rounded-sm text-red-500 border border-[#EF4444]"><i class="fa-regular fa-trash-can"></i></button>
        </div>
        `;
        filteredJobList.appendChild(div);
    }
}

function renderRejected() {
    filteredJobList.innerHTML = '';
    if (rejectedList.length === 0) {
        filteredJobList.innerHTML = '<p class="text-center text-gray-500 py-8">No rejected jobs yet</p>';
        return;
    }

    for (let rejected of rejectedList) {
        let div = document.createElement('div');
        div.className = 'flex justify-between p-4 border border-blue-200 bg-gray-50 rounded-sm';
        div.innerHTML = `
        <div class="space-y-2">
            <h2 class="job-provider text-[18px] font-semibold">${rejected.jobProvider}</h2>
            <p class="job-title text-[#64748B]">${rejected.jobTitle}</p>
            <br>
            <p class="location-type-salary text-[#64748B]">${rejected.locationTypeSalary}</p>
            <br>
            <p class="bg-red-100 text-[#EF4444] font-medium py-2 px-4 w-35 rounded-sm">REJECTED</p>
            <p class="job-details">${rejected.jobDetails}</p>
            <div class="flex gap-4">
                <button class="btn-interview py-2 px-4 w-30 rounded-sm font-bold text-[#10B981] border-2 border-[#10B981]">INTERVIEW</button>
                <button class="btn-rejected py-2 px-4 w-30 rounded-sm font-bold text-[#EF4444] border-2 border-[#EF4444]">REJECTED</button>
            </div>
        </div>
        <div>
            <button class="bg-white p-1 rounded-sm text-red-500 border border-[#EF4444]"><i class="fa-regular fa-trash-can"></i></button>
        </div>
        `;
        filteredJobList.appendChild(div);
    }
}