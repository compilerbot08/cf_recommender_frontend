import './cfcontent.css';
function CfContent(){
    return(
        <div class="container">
            <h1 className='head'>About Codeforces</h1>
            <p className='p'>
            <strong>Codeforces</strong> is one of the most popular platforms for practicing competitive programming. It hosts regular contests, offers a huge collection of problems, and features a vibrant community of programmers worldwide.
            </p>

            <ul className='list'>
            <li>🌍 Used by over a million coders globally</li>
            <li>🏆 Regular rated contests and mashups</li>
            <li>🧠 Tags, difficulty ratings, and editorial support</li>
            <li>🔄 Interactive submission, testing, and hack systems</li>
            </ul>

            <p className="linkp">
            🔗 Visit the official Codeforces site here:
            <a href="https://codeforces.com" target="_blank">https://codeforces.com</a>
            </p>
        </div>
    )
}
export default CfContent;