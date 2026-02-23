let interviewList = [];
let rejectedList = [];

let totalCount = document.getElementById('total-count');
let pageLandTotal = document.getElementById('page-land-total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allJobsCard = document.getElementById('all-available-jobs');
const allJobsEmptyMessage = document.getElementById('all-jobs-empty-message');
const mainContainer = document.querySelector('main');
const filteredJobList = document.getElementById('filtered-job-list');

function calculateCount() {
    totalCount.innerText = allJobsCard.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    pageLandTotal.innerText = allJobsCard.children.length;
    checkAllJobsEmptyState();
}
calculateCount();

function checkAllJobsEmptyState() {
    if (allJobsCard.children.length === 0) {
        allJobsEmptyMessage.classList.remove('hidden');
    } else {
        allJobsEmptyMessage.classList.add('hidden');
    }
}

const btnAllFilter = document.getElementById('btn-all-filter');
const btnInterviewFilter = document.getElementById('btn-interview-filter');
const btnRejectedFilter = document.getElementById('btn-rejected-filter');

function toggleBtnStyle(id) {
    btnAllFilter.classList.remove('bg-blue-500', 'text-white', 'active-tab');
    btnInterviewFilter.classList.remove('bg-blue-500', 'text-white', 'active-tab');
    btnRejectedFilter.classList.remove('bg-blue-500', 'text-white', 'active-tab');

    btnAllFilter.classList.add('bg-gray-200', 'text-gray-800');
    btnInterviewFilter.classList.add('bg-gray-200', 'text-gray-800');
    btnRejectedFilter.classList.add('bg-gray-200', 'text-gray-800');

    const clicked = document.getElementById(id);
    if (clicked) {
        clicked.classList.remove('bg-gray-200', 'text-gray-800');
        clicked.classList.add('bg-blue-500', 'text-white', 'active-tab');
    }

    if (id == 'btn-interview-filter') {
        allJobsCard.classList.add('hidden');
        allJobsEmptyMessage.classList.add('hidden');
        filteredJobList.classList.remove('hidden');
        renderInterview();
    } else if (id == 'btn-rejected-filter') {
        allJobsCard.classList.add('hidden');
        allJobsEmptyMessage.classList.add('hidden');
        filteredJobList.classList.remove('hidden');
        renderRejected();
    } else if (id == 'btn-all-filter') {
        allJobsCard.classList.remove('hidden');
        filteredJobList.classList.add('hidden');
        checkAllJobsEmptyState();
    }
}

function updateAvailableJobsCount() {
    const counterElement = document.getElementById('available-jobs-count');
    const total = parseInt(totalCount.innerText);

    if (btnAllFilter.classList.contains('active-tab')) {
        counterElement.innerHTML = '<p><span id="page-land-total">' + total + '</span> <span>Jobs </span></p>';
    } else if (btnInterviewFilter.classList.contains('active-tab')) {
        counterElement.innerHTML = '<p><span id="page-land-total">' + interviewList.length + '</span> <span>of ' + total + ' Jobs</span></p>';
    } else if (btnRejectedFilter.classList.contains('active-tab')) {
        counterElement.innerHTML = '<p><span id="page-land-total">' + rejectedList.length + '</span> <span>of ' + total + ' Jobs</span></p>';
    }
}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-interview')) {
        const jobCard = event.target.closest('.job-container');
        if (!jobCard) return;

        const jobProviderElement = jobCard.querySelector('.job-provider');
        let jobProvider = '';
        if (jobProviderElement) {
            jobProvider = jobProviderElement.innerText;
        }

        const jobTitleElement = jobCard.querySelector('.job-title');
        let jobTitle = '';
        if (jobTitleElement) {
            jobTitle = jobTitleElement.innerText;
        }

        const locationTypeSalaryElement = jobCard.querySelector('.location-type-salary');
        let locationTypeSalary = '';
        if (locationTypeSalaryElement) {
            locationTypeSalary = locationTypeSalaryElement.innerText;
        }

        const jobDetailsElement = jobCard.querySelector('.job-details');
        let jobDetails = '';
        if (jobDetailsElement) {
            jobDetails = jobDetailsElement.innerText;
        }

        if (!jobProvider) return;

        const cardInfo = {
            jobProvider: jobProvider,
            jobTitle: jobTitle,
            locationTypeSalary: locationTypeSalary,
            jobDetails: jobDetails
        };

        rejectedList = rejectedList.filter(function (item) {
            return item.jobProvider !== jobProvider;
        });

        let foundInInterview = false;
        for (let i = 0; i < interviewList.length; i++) {
            if (interviewList[i].jobProvider === jobProvider) {
                foundInInterview = true;
                break;
            }
        }

        if (!foundInInterview) {
            interviewList.push(cardInfo);
        }

        for (let card of allJobsCard.children) {
            const providerElement = card.querySelector('.job-provider');
            let provider = '';
            if (providerElement) {
                provider = providerElement.innerText;
            }

            if (provider === jobProvider) {
                const statusDiv = card.querySelector('.job-status');
                if (statusDiv) {
                    statusDiv.innerHTML = '<p class="bg-green-100 text-[#10B981] font-medium py-2 px-4 w-35 rounded-sm">INTERVIEW</p>';
                }
                break;
            }
        }

        calculateCount();
        updateAvailableJobsCount();

        if (btnInterviewFilter.classList.contains('active-tab')) {
            renderInterview();
        } else if (btnRejectedFilter.classList.contains('active-tab')) {
            renderRejected();
        } else if (btnAllFilter.classList.contains('active-tab')) {
            checkAllJobsEmptyState();
        }

    } else if (event.target.classList.contains('btn-rejected')) {
        const jobCard = event.target.closest('.job-container');
        if (!jobCard) return;

        const jobProviderElement = jobCard.querySelector('.job-provider');
        let jobProvider = '';
        if (jobProviderElement) {
            jobProvider = jobProviderElement.innerText;
        }

        const jobTitleElement = jobCard.querySelector('.job-title');
        let jobTitle = '';
        if (jobTitleElement) {
            jobTitle = jobTitleElement.innerText;
        }

        const locationTypeSalaryElement = jobCard.querySelector('.location-type-salary');
        let locationTypeSalary = '';
        if (locationTypeSalaryElement) {
            locationTypeSalary = locationTypeSalaryElement.innerText;
        }

        const jobDetailsElement = jobCard.querySelector('.job-details');
        let jobDetails = '';
        if (jobDetailsElement) {
            jobDetails = jobDetailsElement.innerText;
        }

        if (!jobProvider) return;

        const cardInfo = {
            jobProvider: jobProvider,
            jobTitle: jobTitle,
            locationTypeSalary: locationTypeSalary,
            jobDetails: jobDetails
        };

        interviewList = interviewList.filter(function (item) {
            return item.jobProvider !== jobProvider;
        });

        let foundInRejected = false;
        for (let i = 0; i < rejectedList.length; i++) {
            if (rejectedList[i].jobProvider === jobProvider) {
                foundInRejected = true;
                break;
            }
        }

        if (!foundInRejected) {
            rejectedList.push(cardInfo);
        }

        for (let card of allJobsCard.children) {
            const providerElement = card.querySelector('.job-provider');
            let provider = '';
            if (providerElement) {
                provider = providerElement.innerText;
            }

            if (provider === jobProvider) {
                const statusDiv = card.querySelector('.job-status');
                if (statusDiv) {
                    statusDiv.innerHTML = '<p class="bg-red-100 text-[#EF4444] font-medium py-2 px-4 w-35 rounded-sm">REJECTED</p>';
                }
                break;
            }
        }

        calculateCount();
        updateAvailableJobsCount();

        if (btnRejectedFilter.classList.contains('active-tab')) {
            renderRejected();
        } else if (btnInterviewFilter.classList.contains('active-tab')) {
            renderInterview();
        } else if (btnAllFilter.classList.contains('active-tab')) {
            checkAllJobsEmptyState();
        }

    } else if (event.target.classList.contains('btn-delete') || event.target.classList.contains('fa-trash-can')) {
        const deleteButton = event.target.closest('button');
        if (!deleteButton) return;

        const jobCard = deleteButton.closest('.job-container');
        if (!jobCard) return;

        const jobProviderElement = jobCard.querySelector('.job-provider');
        let jobProvider = '';
        if (jobProviderElement) {
            jobProvider = jobProviderElement.innerText;
        }
        if (!jobProvider) return;

        if (!filteredJobList.classList.contains('hidden')) {
            if (btnInterviewFilter.classList.contains('active-tab')) {
                interviewList = interviewList.filter(function (item) {
                    return item.jobProvider !== jobProvider;
                });
                renderInterview();
            } else if (btnRejectedFilter.classList.contains('active-tab')) {
                rejectedList = rejectedList.filter(function (item) {
                    return item.jobProvider !== jobProvider;
                });
                renderRejected();
            }
        }

        for (let card of allJobsCard.children) {
            const providerElement = card.querySelector('.job-provider');
            let provider = '';
            if (providerElement) {
                provider = providerElement.innerText;
            }

            if (provider === jobProvider) {
                card.remove();
                break;
            }
        }

        interviewList = interviewList.filter(function (item) {
            return item.jobProvider !== jobProvider;
        });

        rejectedList = rejectedList.filter(function (item) {
            return item.jobProvider !== jobProvider;
        });

        calculateCount();
        updateAvailableJobsCount();

        if (btnAllFilter.classList.contains('active-tab')) {
            checkAllJobsEmptyState();
        }
    }
});

function renderInterview() {
    filteredJobList.innerHTML = '';
    if (interviewList.length === 0) {
        filteredJobList.innerHTML = `
        <div class="text-center p-10 md:p-25 border-2 border-purple-700 rounded-xl md:mt-10">
            <h2 class="text-8xl text-blue-500"><i class="fa-regular fa-file-lines"></i></h2>
            <br>
            <p class="text-4xl font-bold">No Jobs for Interview</p>
            <br>
            <p>Check back soon for new job opportunities</p>
        </div>`;
        return;
    }

    for (let interview of interviewList) {
        let div = document.createElement('div');
        div.className = 'job-container p-4 border border-blue-200 bg-gray-50 rounded-sm';
        div.innerHTML = `
        <div class="flex justify-between">
            <h2 class="job-provider text-[18px] font-semibold">${interview.jobProvider}</h2>
            <button class="btn-delete bg-white p-1 rounded-sm text-red-500 border border-[#EF4444]"><i class="fa-regular fa-trash-can"></i></button>
        </div>
        <div class="space-y-2">
            <p class="job-title text-[#64748B]">${interview.jobTitle}</p>
            <br>
            <p class="location-type-salary text-[#64748B]">${interview.locationTypeSalary}</p>
            <br>
            <p class="bg-green-100 text-[#10B981] font-medium py-2 px-4 w-35 rounded-sm">INTERVIEW</p>
            <p class="job-details text-justify">${interview.jobDetails}</p>
            <div class="flex gap-4">
                <button class="btn-interview p-2 w-25 md:w-30 rounded-sm md:font-bold text-[#10B981] border md:border-2 border-[#10B981]">INTERVIEW</button>
                <button class="btn-rejected p-2 w-25 md:w-30 rounded-sm md:font-bold text-[#EF4444] border md:border-2 border-[#EF4444]">REJECTED</button>
            </div>
        </div>`;
        filteredJobList.appendChild(div);
    }
}

function renderRejected() {
    filteredJobList.innerHTML = '';
    if (rejectedList.length === 0) {
        filteredJobList.innerHTML = `
        <div class="text-center p-10 md:p-25 border-2 border-purple-700 rounded-xl md:mt-10">
            <h2 class="text-8xl text-blue-500"><i class="fa-regular fa-file-lines"></i></h2>
            <br>
            <p class="text-4xl font-bold">No Jobs Rejected</p>
            <br>
            <p>Check back soon for new job opportunities</p>
        </div>`;
        return;
    }

    for (let rejected of rejectedList) {
        let div = document.createElement('div');
        div.className = 'job-container p-4 border border-blue-200 bg-gray-50 rounded-sm';
        div.innerHTML = `
        <div class="flex justify-between">
            <h2 class="job-provider text-[18px] font-semibold">${rejected.jobProvider}</h2>
            <button class="btn-delete bg-white p-1 rounded-sm text-red-500 border border-[#EF4444]"><i class="fa-regular fa-trash-can"></i></button>
        </div>
        <div class="space-y-2">
            <p class="job-title text-[#64748B]">${rejected.jobTitle}</p>
            <br>
            <p class="location-type-salary text-[#64748B]">${rejected.locationTypeSalary}</p>
            <br>
            <p class="bg-red-100 text-[#EF4444] font-medium py-2 px-4 w-35 rounded-sm">REJECTED</p>
            <p class="job-details text-justify">${rejected.jobDetails}</p>
            <div class="flex gap-4">
                <button class="btn-interview p-2 w-25 md:w-30 rounded-sm md:font-bold text-[#10B981] border md:border-2 border-[#10B981]">INTERVIEW</button>
                <button class="btn-rejected p-2 w-25 md:w-30 rounded-sm md:font-bold text-[#EF4444] border md:border-2 border-[#EF4444]">REJECTED</button>
            </div>
        </div>`;
        filteredJobList.appendChild(div);
    }
}

document.getElementById('btn-all-filter').addEventListener('click', function () {
    toggleBtnStyle('btn-all-filter');
    updateAvailableJobsCount();
});

document.getElementById('btn-interview-filter').addEventListener('click', function () {
    toggleBtnStyle('btn-interview-filter');
    updateAvailableJobsCount();
});

document.getElementById('btn-rejected-filter').addEventListener('click', function () {
    toggleBtnStyle('btn-rejected-filter');
    updateAvailableJobsCount();
});

updateAvailableJobsCount();