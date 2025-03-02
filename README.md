# Bird Identification - Indian Languages

This is the font end code in reach which calls API which identifies birds hosted from repo [birds-id-indian-lang/](https://github.com/neilghosh/birds-id-indian-lang/tree/main)


It assumes the following contract 

### Request 
```
curl -v -X POST \
  -F "img=@test.jpeg" \
https://idx-simple-node-3987408-b3zzuedwgq-el.a.run.app/api
```

### Response 
```
{
  "birdData": {
    "bird_name": "Indian Roller",
    "indian_languages": [
      {
        "language": "Hindi",
        "value": "नीलकंठ"
      },
      {
        "language": "Bengali",
        "value": "নীলকণ্ঠ"
      },
      {
        "language": "Odia",
        "value": "ଭଦଭଦଳିଆ"
      },
      {
        "language": "Tamil",
        "value": "பனங்காடை"
      },
      {
        "language": "Telugu",
        "value": "పాల పిట్ట"
      },
      {
        "language": "Kannada",
        "value": "ನೀಲಕಂಠ"
      },
      {
        "language": "Marathi",
        "value": "नीलकंठ"
      },
      {
        "language": "Gujarati",
        "value": "નીલકંઠ"
      },
      {
        "language": "Malayalam",
        "value": "ഭാരതീയ നീലത്തൊപ്പി"
      }
    ],
    "scientific_name": "Coracias benghalensis"
  },
  "message": "models/gemini-2.0-flash Says...",
  "imgBuffer": "/9j/4AAQSkZJRgABAQAAAQABAAD..."
}
```

This uses two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
