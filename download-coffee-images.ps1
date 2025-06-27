$coffeeImages = @{
    "arabica.jpg" = "https://plus.unsplash.com/premium_photo-1732818136280-0ba650fd29f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fCVEMCVCMCVEMSU4MCVEMCVCMCVEMCVCMSVEMCVCOCVEMCVCQSVEMCVCMCUyMCVEMCVCQSVEMCVCRSVEMSU4NCVEMCVCNXxlbnwwfHwwfHx8MA%3D%3D"
    "robusta.jpg" = "https://images.unsplash.com/photo-1587985782608-20062892559d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    "colombia.jpg" = "https://plus.unsplash.com/premium_photo-1669905375164-388815c9dcf6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fGNvbG9tYmlhJTIwY29mZmVlfGVufDB8fDB8fHww"
    "ethiopia.jpg" = "https://images.unsplash.com/photo-1669938813255-916a6ea376b9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    "capuchino.jpg" = "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}

foreach ($image in $coffeeImages.GetEnumerator()) {
    $outputPath = Join-Path -Path "src/assets/coffee" -ChildPath $image.Key
    Invoke-WebRequest -Uri $image.Value -OutFile $outputPath
    Write-Host "Downloaded $($image.Key) to $outputPath"
}
