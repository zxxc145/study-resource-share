// 全局应用逻辑
const App = {
    // 初始化应用
    init() {
        this.initEventListeners();
        this.initCarousels();
        this.checkAuthStatus();
    },

    // 初始化事件监听器
    initEventListeners() {
        // 返回按钮
        this.setupBackButton();
        // Tab栏切换
        this.setupTabBar();
        // 弹窗关闭
        this.setupModalClose();
        // 表单提交
        this.setupFormSubmission();
        // 搜索功能
        this.setupSearch();
        // 分类Tab切换
        this.setupCategoryTabs();
    },

    // 设置返回按钮
    setupBackButton() {
        const backBtns = document.querySelectorAll('.back-btn');
        backBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                window.history.back();
            });
        });
    },

    // 设置Tab栏切换
    setupTabBar() {
        const tabItems = document.querySelectorAll('.tabbar-item');
        if (tabItems.length === 0) return;

        tabItems.forEach(item => {
            item.addEventListener('click', () => {
                // 移除所有激活状态
                tabItems.forEach(li => li.classList.remove('active'));
                // 添加当前激活状态
                item.classList.add('active');

                // 获取目标页面
                const target = item.getAttribute('data-target');
                if (target) {
                    this.navigateTo(target);
                }
            });
        });

        // 根据当前页面设置激活的Tab
        this.setActiveTab();
    },

    // 根据当前页面设置激活的Tab
    setActiveTab() {
        const pathname = window.location.pathname;
        const tabItems = document.querySelectorAll('.tabbar-item');

        tabItems.forEach(item => {
            const target = item.getAttribute('data-target');
            if (target && pathname.includes(target)) {
                item.classList.add('active');
            }
        });
    },

    // 设置弹窗关闭
    setupModalClose() {
        const closeBtns = document.querySelectorAll('.modal-close');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.hideModal();
            });
        });

        // 点击遮罩关闭弹窗
        const overlays = document.querySelectorAll('.modal-overlay');
        overlays.forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.hideModal();
                }
            });
        });
    },

    // 设置表单提交
    setupFormSubmission() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    },

    // 设置搜索功能
    setupSearch() {
        const searchBtns = document.querySelectorAll('.search-btn');
        const searchInputs = document.querySelectorAll('.search-input');

        searchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.previousElementSibling;
                const keyword = input ? input.value.trim() : '';
                if (keyword) {
                    this.navigateTo(`search-result.html?keyword=${encodeURIComponent(keyword)}`);
                }
            });
        });

        searchInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const keyword = input.value.trim();
                    if (keyword) {
                        this.navigateTo(`search-result.html?keyword=${encodeURIComponent(keyword)}`);
                    }
                }
            });
        });
    },

    // 设置分类Tab切换
    setupCategoryTabs() {
        const categorySections = document.querySelectorAll('.category-tabs');
        categorySections.forEach(section => {
            const tabs = section.querySelectorAll('.category-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // 移除所有激活状态
                    tabs.forEach(t => t.classList.remove('active'));
                    // 添加当前激活状态
                    tab.classList.add('active');

                    // 这里可以添加分类筛选逻辑
                    const category = tab.getAttribute('data-category');
                    console.log('切换到分类:', category);
                });
            });
        });
    },

    // 初始化轮播图
    initCarousels() {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            this.initCarousel(carousel);
        });
    },

    // 初始化单个轮播图
    initCarousel(carousel) {
        const slideItems = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        
        if (slideItems.length === 0 || dots.length === 0) return;

        let currentIndex = 0;
        const slideCount = slideItems.length;

        // 自动轮播
        setInterval(() => {
            // 隐藏当前轮播项
            slideItems[currentIndex].classList.add('hidden');
            dots[currentIndex].classList.remove('active');
            dots[currentIndex].classList.add('bg-gray-300');
            dots[currentIndex].classList.remove('bg-white');
            
            // 更新索引
            currentIndex = (currentIndex + 1) % slideCount;
            
            // 显示下一个轮播项
            slideItems[currentIndex].classList.remove('hidden');
            dots[currentIndex].classList.add('active');
            dots[currentIndex].classList.remove('bg-gray-300');
            dots[currentIndex].classList.add('bg-white');
        }, 3000);

        // 点击指示器切换
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // 隐藏当前轮播项
                slideItems[currentIndex].classList.add('hidden');
                dots[currentIndex].classList.remove('active');
                dots[currentIndex].classList.add('bg-gray-300');
                dots[currentIndex].classList.remove('bg-white');
                
                // 更新索引
                currentIndex = index;
                
                // 显示选中的轮播项
                slideItems[currentIndex].classList.remove('hidden');
                dots[currentIndex].classList.add('active');
                dots[currentIndex].classList.remove('bg-gray-300');
                dots[currentIndex].classList.add('bg-white');
            });
        });
    },

    // 检查用户认证状态
    checkAuthStatus() {
        // 模拟用户认证状态
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        
        // 根据认证状态更新UI
        this.updateAuthUI(isAuthenticated);
        
        // 添加未认证拦截逻辑
        this.setupAuthInterception(isAuthenticated);
    },

    // 更新认证相关UI
    updateAuthUI(isAuthenticated) {
        // 示例：更新认证按钮显示
        const authBtns = document.querySelectorAll('.auth-btn');
        authBtns.forEach(btn => {
            if (isAuthenticated) {
                btn.textContent = '已认证';
                btn.disabled = true;
            } else {
                btn.textContent = '去认证';
                btn.disabled = false;
            }
        });
    },

    // 设置未认证拦截
    setupAuthInterception(isAuthenticated) {
        // 如果已认证，则不拦截
        if (isAuthenticated) return;

        // 拦截需要认证的操作
        const authRequiredElements = document.querySelectorAll('.auth-required');
        authRequiredElements.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal('modal-unverify.html');
            });
        });
    },

    // 显示弹窗
    showModal(modalPath) {
        // 如果是本地弹窗（已在页面中）
        if (document.querySelector('.modal-overlay')) {
            const overlay = document.querySelector('.modal-overlay');
            overlay.classList.remove('hidden');
            return;
        }

        // 如果需要从外部加载弹窗
        // 这里简化处理，直接跳转到弹窗页面
        this.navigateTo(modalPath);
    },

    // 隐藏弹窗
    hideModal() {
        const overlays = document.querySelectorAll('.modal-overlay');
        overlays.forEach(overlay => {
            overlay.classList.add('hidden');
        });
    },

    // 处理表单提交
    handleFormSubmit(form) {
        const formData = new FormData(form);
        const action = form.getAttribute('action');
        
        console.log('表单提交数据:', Object.fromEntries(formData));
        
        // 模拟表单提交
        setTimeout(() => {
            if (action) {
                this.navigateTo(action);
            } else {
                // 显示成功提示
                alert('提交成功！');
                form.reset();
            }
        }, 1000);
    },

    // 页面导航
    navigateTo(path) {
        window.location.href = path;
    },

    // 模拟登录/认证
    simulateAuth() {
        localStorage.setItem('isAuthenticated', 'true');
        this.checkAuthStatus();
    },

    // 模拟登出
    simulateLogout() {
        localStorage.removeItem('isAuthenticated');
        this.checkAuthStatus();
    }
};

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// 导出App对象以便在其他地方使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}