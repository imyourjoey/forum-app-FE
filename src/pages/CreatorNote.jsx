import NavBar from "../components/Navbar";

function CreatorNote() {
  return (
    <>
      <NavBar />
      <div className="center-container">
        <div className="font-bold text-2xl my-3">Note From the Creator</div>
        <div>
          Welcome to UMS Confessions! Excited to have you here. This website
          supports English, Bahasa Malaysia, and Chinese, on both desktop and
          mobile! However, it was built in just four days, so there may be bugs
          and imperfections. Feel free to send your feedback to{" "}
          <a
            href="mailto:umsconfessions@protonmail.com"
            className="underline text-blue-700"
          >
            umsconfessions@protonmail.com
          </a>
          . I'll read all the feedback and consider implementing your
          suggestions.
          <br />
          <br />
          This site is designed to foster open and anonymous communication
          between UMS students, allowing you to express yourself freely. No
          email is required for sign-up, ensuring your complete anonymity.
          You'll notice there's no like/dislike system here, as I believe that
          promotes more authentic expressions and interactions. Additionally,
          users cannot delete posts on this site. Therefore, I trust the UMS
          community to share respectful and thoughtful content, because
          ultimately, it's up to you what you choose to post. Use the site if
          you like, and if you don't, that's totally fine too!
          <br />
          <br />
          You may have noticed that the site doesn't have a logo yet. I thought
          it would be great to involve the community in this process! If you
          have a logo, please share it by posting a link from Google Drive or
          Imgur, and I'll select the most popular ones to feature on the site.
          <br />
          <br />
          Thank you for taking the time to read this note!
        </div>
      </div>
    </>
  );
}

export default CreatorNote;
