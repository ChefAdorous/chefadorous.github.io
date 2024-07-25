// Fetch repositories
async function fetchRepositories() {
    try {
        const response = await fetch('https://api.github.com/users/ChefAdorous/repos');
        const repos = await response.json();
        const reposList = document.getElementById('repos-list');
        repos.forEach(repo => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = repo.html_url;
            a.textContent = repo.name;
            a.className = 'text-blue-500 hover:underline';
            li.appendChild(a);
            reposList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

// Wallet connection
let provider, signer, address;

async function connectWallet() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        address = await signer.getAddress();
        updateWalletSection();
    } catch (error) {
        console.error('Failed to connect wallet:', error);
    }
}

function disconnectWallet() {
    provider = null;
    signer = null;
    address = null;
    updateWalletSection();
}

function updateWalletSection() {
    const walletSection = document.getElementById('wallet-section');
    if (address) {
        walletSection.innerHTML = `
            <p>Connected: ${address.slice(0, 6)}...${address.slice(-4)}</p>
            <button id="disconnect-wallet" class="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Disconnect</button>
        `;
        document.getElementById('disconnect-wallet').addEventListener('click', disconnectWallet);
    } else {
        walletSection.innerHTML = `
            <button id="connect-wallet" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Connect Wallet</button>
        `;
        document.getElementById('connect-wallet').addEventListener('click', connectWallet);
    }
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    fetchRepositories();
    updateWalletSection();
});
