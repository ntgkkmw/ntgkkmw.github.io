document.addEventListener('DOMContentLoaded', () => {
    const memoForm = document.getElementById('memo-form');
    const memoList = document.getElementById('memo-list');
    let memos = JSON.parse(localStorage.getItem('memos')) || [];

    const saveMemos = () => {
        localStorage.setItem('memos', JSON.stringify(memos));
    };

    const renderMemos = () => {
        memoList.innerHTML = '';
        memos.forEach((memo, index) => {
            const memoItem = document.createElement('li');
            memoItem.classList.add('memo-item');

            memoItem.innerHTML = `
                <h3>${memo.title}</h3>
                <div class="actions">
                    <button class="view" data-index="${index}">閲覧</button>
                    <button class="edit" data-index="${index}">編集</button>
                    <button class="delete" data-index="${index}">削除</button>
                </div>
            `;

            memoList.appendChild(memoItem);
        });
    };

    const addMemo = (title, content) => {
        if (memos.length >= 10) {
            alert('メモは最大10個までです。');
            return;
        }
        memos.push({ title, content });
        saveMemos();
        renderMemos();
    };

    const deleteMemo = (index) => {
        memos.splice(index, 1);
        saveMemos();
        renderMemos();
    };

    memoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        if (title && content) {
            addMemo(title, content);
            memoForm.reset();
        }
    });

    memoList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('view')) {
            localStorage.setItem('currentMemo', JSON.stringify(memos[index]));
            window.location.href = 'view.html';
        } else if (e.target.classList.contains('edit')) {
            localStorage.setItem('currentMemo', JSON.stringify(memos[index]));
            window.location.href = 'edit.html';
        } else if (e.target.classList.contains('delete')) {
            deleteMemo(index);
        }
    });

    renderMemos();
});
