export default async function getVideoContent() {
    try {
        const response = await fetch('http://localhost:8080/api/video/videoplayback.mp4/stream');
        const data = await response.arrayBuffer();
        return data;
    } catch (error) {
        console.error(error)
    }
}
